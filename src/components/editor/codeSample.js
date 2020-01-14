const codeSample = `DEF SW   0x81                ; DIP kapcsoló adatregiszter (csak olvasható)
DEF COL0 0x94                ; Kijelző COL0 adatregiszter (írható/olvasható)
DEF COL1 0x95                ; Kijelző COL1 adatregiszter (írható/olvasható)
DEF COL2 0x96                ; Kijelző COL2 adatregiszter (írható/olvasható)
DEF COL3 0x97                ; Kijelző COL3 adatregiszter (írható/olvasható)
DEF COL4 0x98                ; Kijelző COL4 adatregiszter (írható/olvasható)

    data
    org 10
all_sprites:                                            ;minden sor egy kirajzolható kép: az első 6 a bal oldali nyíl lehetséges állapotai, a második 6 a bal oldali nyíl lehetséges állapotai
    DB "alma"
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
    mov r0, #0b00001111
    mov r1, #0b00001111
    mov r2, #0b00001001
    and r0, r1
    and r0, r2`;
export default codeSample;
