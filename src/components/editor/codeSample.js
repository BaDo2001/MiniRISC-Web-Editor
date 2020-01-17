const codeSample = `DEF SW   0x81                ; DIP kapcsoló adatregiszter (csak olvasható)
DEF COL0 0x94                ; Kijelző COL0 adatregiszter (írható/olvasható)
DEF COL1 0x95                ; Kijelző COL1 adatregiszter (írható/olvasható)
DEF COL2 0x96                ; Kijelző COL2 adatregiszter (írható/olvasható)
DEF COL3 0x97                ; Kijelző COL3 adatregiszter (írható/olvasható)
DEF COL4 0x98                ; Kijelző COL4 adatregiszter (írható/olvasható)

    data

all_sprites: ;minden sor egy kirajzolható kép: az első 6 a bal oldali nyíl lehetséges állapotai, a második 6 a bal oldali nyíl lehetséges állapotai
    DB 0b0000000, 0b0000000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0010000, 0b0000000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0010000, 0b0001000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0010000, 0b0001000, 0b0000100, 0b0000000, 0b0000000
    DB 0b0010000, 0b0001000, 0b0000100, 0b0000010, 0b0000000
    DB 0b0010000, 0b0001001, 0b0000101, 0b0000011, 0b0001111
    DB 0b0000000, 0b0000000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0000100, 0b0000000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0000100, 0b0001000, 0b0000000, 0b0000000, 0b0000000
    DB 0b0000100, 0b0001000, 0b0010000, 0b0000000, 0b0000000
    DB 0b0000100, 0b0001000, 0b0010000, 0b0100000, 0b0000000
    DB 0b0000100, 0b1001000, 0b1010000, 0b1100000, 0b1111000    
    
;regiszterhasználat:
;r0 animáció indexét tároló regiszter
;r1 kirajzolandó spritesheet indexét tároló regiszter
;r2 első kapcsoló (irányt állító kapcsoló) előző állapotát tároló regiszter
;r3 gombokat olvasó regiszter
;r4 kirajzolandó sprite_sheet memóriamcímét tároló regiszter
;r5 ciklusváltozó
;r6 oszlopok memóriacímét tároló regiszter
;r7 kirajzolásnál használatos segédregiszter
;r8-r9-r10 időzítő regiszterei
    code

start:
    MOv r0, #0                                          ;a spriteindex először 0 (ha animáció van, akkor ezáltal azonnal elkezdődik az animáció)
    mov r3, SW                                          ;beolvassuk a kapcsolókat
    and r3, #0b00000010                                 ;az elsőre (jobb vagy bal irány) maszkolunk
    mov r2, r3                                          ;és ezt elmentjük r2-ben, hogy az elejétől kezdve tudjunk animálni
loop:
    mov r3, SW                                          
    and r3, #0b00000100                                 ;most a második kapcsolóra (animáció vagy teljes nyíl) maszkolunk
    jnz set_index_in_animation_mode                     ;ha 1 a kapcsoló, akkor animációs módba megyünk
    mov r0, #5                                          ;különben beállítjuk a sprite indexet a teljes nyilat tartalmazó sprite-ra
    jmp left_or_right                                   ;és átugorjuk az animációs részt
set_index_in_animation_mode:            
    add r0, #1                                          ;hozzáadunk a sprite-indexhez egyet
    cmp r0, #6                                          ;megnézzük, hogy elértük-e a 6-ot
    jnz check_for_direction_change_during_animation     ;ha nem, akkor mehetünk tovább
    mov r0, #0                                          ;ha igen, akkor újra kell kezdeni az animációt
check_for_direction_change_during_animation:
    mov r3, SW                                          ;
    and r3, #0b00000010                                 ;most az elsőre (jobb vagy bal irány) maszkolunk
    cmp r3, r2                                          ;megnézzük, hogy a mostani irány megegyezik-e az eddigivel
    jz left_or_right                                    ;ha igen, akkor nincs dolgunk
    mov r0, #0                                          ;ha nem, akkor újra kell kezdeni az animációt, ezért a sprite-indexet lenullázzuk.
    mov r2, r3                                          ;és elmentjük az irányt
left_or_right:
    mov r1, r0                                          ;beállítjuk, hogy melyik animáció-indexű sprite legyen kitéve (ezen már csak az irány tud módosítani)
    mov r3, SW                                          ;
    and r3, #0b00000010                                 ;most újra az elsőre (jobb vagy bal irány) maszkolunk
    jz load_sprite                                      ;ha a bal oldal van kiválasztva, akkor nincs dolgunk
    add r1, #6                                          ;ha a jobb, akkor a sprite indexet át kell állítani a jobb nyílhoz tartozó sprite-okhoz
load_sprite:
    mov r4, #all_sprites                                ;betesszük az adatok kezdőcímét r4-be
    mov r5, #5                                          ;a ciklusváltozóba pedig 5-t, mert r4 += r1*5 műveletet végzünk, hogy a helyes spritehoz kerüljünk
set_correct_sprite_sheet:
    add r4, r1                                          ;növeljük az adatcímet sprite indexnyivel
    sub r5, #1                                          ;ciklusváltozóból kivonunk 1-t
    jnz set_correct_sprite_sheet                        ;ha nem 0, akkor maradunk a ciklusban
    mov r6, #COL0                                       ;r6-ba betesszük az első oszlop memóriacímét
    mov r5, #5                                          ;a ciklusváltozóba pedig 5-t, mert 5 oszlop van
show_column_by_column:
    mov r7, (r4)                                        ;az r7-be betesszük a sprite tartalmát
    mov (r6), r7                                        ;ezt betesszük az oszlopba
    add r6, #1                                          ;léptetjük az oszlopot
    add r4, #1                                          ;és a sprite-ot is
    sub r5, #1                                          ;ciklusváltozóból kivonunk 1-t
    jnz show_column_by_column                           ;ha nem 0, akkor maradunk a ciklusban
    jsr wait19                                          ;kirajzolás után várunk
    mov r3, SW                                          ;
    and r3, #0b00000001                                 ;most az első kapcsolóra (villog vagy statikus) maszkolunk
    jnz loop                                            ;ha statikus állapot van, akkor kezdhetjük elölről
    mov r6, #COL0                                       ;különben betesszük r6-ba az első oszlop memóriacímét
    mov r5, #5                                          ;a ciklusváltozóba 5-t, mert 5 oszlop van
    mov r7, #0                                          ;az r7-be pedig 0-t, hogy ezt betölthessük az oszlopokba
clear_column_by_column:
    mov (r6), r7                                        ;betöltjük a 0-t az oszlopba
    add r6, #1                                          ;léptetjük az oszlopot
    sub r5, #1                                          ;ciklusváltozóból kivonunk 1-t
    jnz clear_column_by_column                          ;ha nem 0, akkor maradunk a ciklusban
    jsr wait19                                          ;megint várunk
    jmp loop                                            ;aztán kezdjük újra
   
wait19:                                                 ;sima számláló, ami 2^19-ig számol, aztán visszatér
    mov r8, #0b11111000                                 
    mov r9, #0
    mov r10, #0
wait:
    add r10, #1
    adc r9, #0
    adc r8, #0
    jnc wait
    rts`;
export default codeSample;
