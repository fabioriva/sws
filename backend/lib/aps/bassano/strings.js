export const devices = [
  'Elevatore (A)',
  'Elevatore (B)',
  'Torre (T)'
]

export const modes = [
  '---',
  'Introduzione',
  'Lettura Dati',
  'Emergenza 1',
  'Emergenza 2',
  'Mappa',
  'Passo-Passo',
  'Preset',
  'Automatico'
]

export const operations = [
  '---',
  'Allarme on',
  'Allarme off',
  'Cambio Funzione',
  'Codice PIN tesera modificato',
  'Ciclo deposito',
  'Ciclo ritiro',
  'Ciclo scambio deposito',
  'Ciclo scambio ritiro',
  '---',
  'Richiesta entrata',
  'Richiesta uscita',
  '---',
  '---',
  '---',
  '---'
]

export const measures = [
  'Laser V1',
  'Laser V2',
  'Laser H1',
  'Laser H2'
]

export const inputs1 = [
  { addr: 'E0.0', label: 'A', info: '' },
  { addr: 'E0.1', label: 'B', info: '' },
  { addr: 'E0.2', label: 'C', info: '' },
  { addr: 'E0.3', label: 'D', info: '' },
  { addr: 'E0.4', label: 'OK', info: '' },
  { addr: 'E0.5', label: 'S2', info: '' },
  { addr: 'E0.6', label: 'S2', info: '' },
  { addr: 'E0.7', label: 'S2', info: '' },
  { addr: 'E1.0', label: 'A', info: '' },
  { addr: 'E1.1', label: 'B', info: '' },
  { addr: 'E1.2', label: 'C', info: '' },
  { addr: 'E1.3', label: 'D', info: '' },
  { addr: 'E1.4', label: 'STR', info: '' },
  { addr: 'E1.5', label: 'OK', info: '' },
  { addr: 'E1.6', label: 'DAT', info: '' },
  { addr: 'E1.7', label: 'UC', info: '' },
  { addr: 'E2.0', label: 'FE1', info: '' },
  { addr: 'E2.1', label: 'SA', info: '' },
  { addr: 'E2.2', label: '', info: '' },
  { addr: 'E2.3', label: 'RSI', info: '' },
  { addr: 'E2.4', label: '', info: '' },
  { addr: 'E2.5', label: 'S1', info: '' },
  { addr: 'E2.6', label: 'S1', info: '' },
  { addr: 'E2.7', label: 'S1', info: '' },
  { addr: 'E3.0', label: '', info: '' },
  { addr: 'E3.1', label: '', info: '' },
  { addr: 'E3.2', label: '', info: '' },
  { addr: 'E3.3', label: '', info: '' },
  { addr: 'E3.4', label: 'DB32', info: '' },
  { addr: 'E3.5', label: 'DBHZ', info: '' },
  { addr: 'E3.6', label: '', info: '' },
  { addr: 'E3.7', label: '', info: '' }
]
export const inputs2 = [
  { addr: 'E10.0', label: 'ECA', info: '' },
  { addr: 'E10.1', label: 'ECB', info: '' },
  { addr: 'E10.2', label: 'AMC', info: '' },
  { addr: 'E10.3', label: 'SPR', info: '' },
  { addr: 'E10.4', label: 'ADN', info: '' },
  { addr: 'E10.5', label: 'AD', info: '' },
  { addr: 'E10.6', label: 'ANV', info: '' },
  { addr: 'E10.7', label: 'KEXPV', info: '' },
  { addr: 'E11.0', label: 'EOM1', info: '' },
  { addr: 'E11.1', label: 'EZM1', info: '' },
  { addr: 'E11.2', label: 'AMM1', info: '' },
  { addr: 'E11.3', label: 'EOM2', info: '' },
  { addr: 'E11.4', label: 'EZM2', info: '' },
  { addr: 'E11.5', label: 'AMM2', info: '' },
  { addr: 'E11.6', label: 'IV1', info: '' },
  { addr: 'E11.7', label: 'FTC', info: '' },
  { addr: 'E12.0', label: 'MNA', info: '' },
  { addr: 'E12.1', label: 'MNB', info: '' },
  { addr: 'E12.2', label: 'EXPV', info: '' },
  { addr: 'E12.3', label: 'EFB', info: '' },
  { addr: 'E12.4', label: 'FRE', info: '' },
  { addr: 'E12.5', label: 'KBA', info: '' },
  { addr: 'E12.6', label: 'KEXP', info: '' },
  { addr: 'E12.7', label: 'KEZ', info: '' },
  { addr: 'E13.0', label: 'A', info: '' },
  { addr: 'E13.1', label: 'B', info: '' },
  { addr: 'E13.2', label: 'C', info: '' },
  { addr: 'E13.3', label: 'D', info: '' },
  { addr: 'E13.4', label: 'STR', info: '' },
  { addr: 'E13.5', label: 'OK', info: '' },
  { addr: 'E13.6', label: 'DAT', info: '' },
  { addr: 'E13.7', label: 'FE', info: '' },
  { addr: 'E14.0', label: 'EZE', info: '' },
  { addr: 'E14.1', label: 'EOE', info: '' },
  { addr: 'E14.2', label: 'FBE', info: '' },
  { addr: 'E14.3', label: 'FPE', info: '' },
  { addr: 'E14.4', label: 'FDR', info: '' },
  { addr: 'E14.5', label: 'FDL', info: '' },
  { addr: 'E14.6', label: 'FTA1', info: '' },
  { addr: 'E14.7', label: 'FTA2', info: '' },
  { addr: 'E15.0', label: 'FLP', info: '' },
  { addr: 'E15.1', label: 'FLA', info: '' },
  { addr: 'E15.2', label: 'RX', info: '' },
  { addr: 'E15.3', label: 'POD', info: '' },
  { addr: 'E15.4', label: 'APE', info: '' },
  { addr: 'E15.5', label: 'PRST', info: '' },
  { addr: 'E15.6', label: 'FTXV', info: '' },
  { addr: 'E15.7', label: 'FTXH', info: '' },
  { addr: 'E16.0', label: 'MDR', info: '' },
  { addr: 'E16.1', label: 'MDL', info: '' },
  { addr: 'E16.2', label: 'EDR', info: '' },
  { addr: 'E16.3', label: 'EDL', info: '' },
  { addr: 'E16.4', label: '', info: '' },
  { addr: 'E16.5', label: '', info: '' },
  { addr: 'E16.6', label: '', info: '' },
  { addr: 'E16.7', label: '', info: '' },
  { addr: 'E17.0', label: '', info: '' },
  { addr: 'E17.1', label: '', info: '' },
  { addr: 'E17.2', label: '', info: '' },
  { addr: 'E17.3', label: '', info: '' },
  { addr: 'E17.4', label: '', info: '' },
  { addr: 'E17.5', label: '', info: '' },
  { addr: 'E17.6', label: '', info: '' },
  { addr: 'E17.7', label: '', info: '' }
]
export const inputs3 = [
  { addr: 'E20.0', label: 'ECA', info: '' },
  { addr: 'E20.1', label: 'ECB', info: '' },
  { addr: 'E20.2', label: 'AMC', info: '' },
  { addr: 'E20.3', label: 'SPR', info: '' },
  { addr: 'E20.4', label: 'ADN', info: '' },
  { addr: 'E20.5', label: 'AD', info: '' },
  { addr: 'E20.6', label: 'ANV', info: '' },
  { addr: 'E20.7', label: 'KEXPV', info: '' },
  { addr: 'E21.0', label: 'EOM1', info: '' },
  { addr: 'E21.1', label: 'EZM1', info: '' },
  { addr: 'E21.2', label: 'AMM1', info: '' },
  { addr: 'E21.3', label: 'EOM2', info: '' },
  { addr: 'E21.4', label: 'EZM2', info: '' },
  { addr: 'E21.5', label: 'AMM2', info: '' },
  { addr: 'E21.6', label: 'IV1', info: '' },
  { addr: 'E21.7', label: 'FTC', info: '' },
  { addr: 'E22.0', label: 'MNA', info: '' },
  { addr: 'E22.1', label: 'MNB', info: '' },
  { addr: 'E22.2', label: 'EXPV', info: '' },
  { addr: 'E22.3', label: 'EFB', info: '' },
  { addr: 'E22.4', label: 'FRE', info: '' },
  { addr: 'E22.5', label: 'KBA', info: '' },
  { addr: 'E22.6', label: 'KEXP', info: '' },
  { addr: 'E22.7', label: 'KEZ', info: '' },
  { addr: 'E23.0', label: 'A', info: '' },
  { addr: 'E23.1', label: 'B', info: '' },
  { addr: 'E23.2', label: 'C', info: '' },
  { addr: 'E23.3', label: 'D', info: '' },
  { addr: 'E23.4', label: 'STR', info: '' },
  { addr: 'E23.5', label: 'OK', info: '' },
  { addr: 'E23.6', label: 'DAT', info: '' },
  { addr: 'E23.7', label: 'FE', info: '' },
  { addr: 'E24.0', label: 'EZE', info: '' },
  { addr: 'E24.1', label: 'EOE', info: '' },
  { addr: 'E24.2', label: 'FBE', info: '' },
  { addr: 'E24.3', label: 'FPE', info: '' },
  { addr: 'E24.4', label: 'FDR', info: '' },
  { addr: 'E24.5', label: 'FDL', info: '' },
  { addr: 'E24.6', label: 'FTA1', info: '' },
  { addr: 'E24.7', label: 'FTA2', info: '' },
  { addr: 'E25.0', label: 'FLP', info: '' },
  { addr: 'E25.1', label: 'FLA', info: '' },
  { addr: 'E25.2', label: 'RX', info: '' },
  { addr: 'E25.3', label: 'POD', info: '' },
  { addr: 'E25.4', label: 'APE', info: '' },
  { addr: 'E25.5', label: 'PRST', info: '' },
  { addr: 'E25.6', label: 'FTXV', info: '' },
  { addr: 'E25.7', label: 'FTXH', info: '' },
  { addr: 'E26.0', label: 'MDR', info: '' },
  { addr: 'E26.1', label: 'MDL', info: '' },
  { addr: 'E26.2', label: 'EDR', info: '' },
  { addr: 'E26.3', label: 'EDL', info: '' },
  { addr: 'E26.4', label: '', info: '' },
  { addr: 'E26.5', label: '', info: '' },
  { addr: 'E26.6', label: '', info: '' },
  { addr: 'E26.7', label: '', info: '' },
  { addr: 'E27.0', label: '', info: '' },
  { addr: 'E27.1', label: '', info: '' },
  { addr: 'E27.2', label: '', info: '' },
  { addr: 'E27.3', label: '', info: '' },
  { addr: 'E27.4', label: '', info: '' },
  { addr: 'E27.5', label: '', info: '' },
  { addr: 'E27.6', label: '', info: '' },
  { addr: 'E27.7', label: '', info: '' }
]
export const inputs4 = [
  { addr: 'E30.0', label: 'EHPA', info: '' },
  { addr: 'E30.1', label: 'EHPB', info: '' },
  { addr: 'E30.2', label: '', info: '' },
  { addr: 'E30.3', label: 'ASBK', info: '' },
  { addr: 'E30.4', label: 'SBK', info: '' },
  { addr: 'E30.5', label: 'RTA', info: '' },
  { addr: 'E30.6', label: 'FE1', info: '' },
  { addr: 'E30.7', label: 'AF7', info: '' },
  { addr: 'E31.0', label: 'IV1', info: '' },
  { addr: 'E31.1', label: 'IV2', info: '' },
  { addr: 'E31.2', label: '', info: '' },
  { addr: 'E31.3', label: 'RSI', info: '' },
  { addr: 'E31.4', label: '', info: '' },
  { addr: 'E31.5', label: 'AH', info: '' },
  { addr: 'E31.6', label: 'AGF', info: '' },
  { addr: 'E31.7', label: 'AKKP', info: '' }
]
export const inputs5 = [
  { addr: 'E40.0', label: 'A', info: '' },
  { addr: 'E40.1', label: 'B', info: '' },
  { addr: 'E40.2', label: 'C', info: '' },
  { addr: 'E40.3', label: 'D', info: '' },
  { addr: 'E40.4', label: 'OK', info: '' },
  { addr: 'E40.5', label: 'S2', info: '' },
  { addr: 'E40.6', label: 'S2', info: '' },
  { addr: 'E40.7', label: 'S2', info: '' },
  { addr: 'E41.0', label: 'EM', info: '' },
  { addr: 'E41.1', label: 'EXPV', info: '' },
  { addr: 'E41.2', label: '', info: '' },
  { addr: 'E41.3', label: '', info: '' },
  { addr: 'E41.4', label: 'TCR', info: '' },
  { addr: 'E41.5', label: 'MTC', info: '' },
  { addr: 'E41.6', label: 'FTXV', info: '' },
  { addr: 'E41.7', label: 'FTXH', info: '' },
  { addr: 'E42.0', label: 'RV', info: '' },
  { addr: 'E42.1', label: 'RH', info: '' },
  { addr: 'E42.2', label: 'RES', info: '' },
  { addr: 'E42.3', label: 'REH', info: '' },
  { addr: 'E42.4', label: 'RCV', info: '' },
  { addr: 'E42.5', label: 'REAV', info: '' },
  { addr: 'E42.6', label: 'REAH', info: '' },
  { addr: 'E42.7', label: 'RCH', info: '' },
  { addr: 'E43.0', label: '', info: '' },
  { addr: 'E43.1', label: '', info: '' },
  { addr: 'E43.2', label: 'SFA', info: '' },
  { addr: 'E43.3', label: '', info: '' },
  { addr: 'E43.4', label: 'DB32', info: '' },
  { addr: 'E43.5', label: 'DBHZ', info: '' },
  { addr: 'E43.6', label: '', info: '' },
  { addr: 'E43.7', label: 'UC', info: '' }
]
export const outputs1 = [
  { addr: 'A0.0', label: 'A', info: '' },
  { addr: 'A0.1', label: 'B', info: '' },
  { addr: 'A0.2', label: 'C', info: '' },
  { addr: 'A0.3', label: 'D', info: '' },
  { addr: 'A0.4', label: 'AD1', info: '' },
  { addr: 'A0.5', label: 'AD2', info: '' },
  { addr: 'A0.6', label: 'AD3', info: '' },
  { addr: 'A0.7', label: 'STR', info: '' },
  { addr: 'A1.0', label: 'LK', info: '' },
  { addr: 'A1.1', label: 'LE', info: '' },
  { addr: 'A1.2', label: 'LB', info: '' },
  { addr: 'A1.3', label: 'RDY', info: '' },
  { addr: 'A1.4', label: 'RST', info: '' },
  { addr: 'A1.5', label: 'RBU', info: '' },
  { addr: 'A1.6', label: 'LA', info: '' },
  { addr: 'A1.7', label: 'LC', info: '' }
]
export const outputs2 = [
  { addr: 'A10.0', label: 'KEM', info: '' },
  { addr: 'A10.1', label: 'KBA', info: '' },
  { addr: 'A10.2', label: 'KXPE', info: '' },
  { addr: 'A10.3', label: 'SQA', info: '' },
  { addr: 'A10.4', label: 'TD', info: '' },
  { addr: 'A10.5', label: '', info: '' },
  { addr: 'A10.6', label: '', info: '' },
  { addr: 'A10.7', label: '', info: '' },
  { addr: 'A11.0', label: 'L1', info: '' },
  { addr: 'A11.1', label: 'L2', info: '' },
  { addr: 'A11.2', label: 'L3', info: '' },
  { addr: 'A11.3', label: 'L4', info: '' },
  { addr: 'A11.4', label: 'L5', info: '' },
  { addr: 'A11.5', label: 'RFE', info: '' },
  { addr: 'A11.6', label: 'RLN', info: '' },
  { addr: 'A11.7', label: 'RBE', info: '' },
  { addr: 'A12.0', label: 'SCA', info: '' },
  { addr: 'A12.1', label: 'SCB', info: '' },
  { addr: 'A12.2', label: 'SMA1', info: '' },
  { addr: 'A12.3', label: 'SMB1', info: '' },
  { addr: 'A12.4', label: 'SMA2', info: '' },
  { addr: 'A12.5', label: 'SMB2', info: '' },
  { addr: 'A12.6', label: '', info: '' },
  { addr: 'A12.7', label: 'LC', info: '' },
  { addr: 'A13.0', label: 'LK', info: '' },
  { addr: 'A13.1', label: 'LE', info: '' },
  { addr: 'A13.2', label: 'LB', info: '' },
  { addr: 'A13.3', label: 'RDY', info: '' },
  { addr: 'A13.4', label: 'RST', info: '' },
  { addr: 'A13.5', label: 'SDR', info: '' },
  { addr: 'A13.6', label: 'SDL', info: '' },
  { addr: 'A13.7', label: 'SDN', info: '' },
  { addr: 'A14.0', label: '', info: '' },
  { addr: 'A14.1', label: '', info: '' },
  { addr: 'A14.2', label: '', info: '' },
  { addr: 'A14.3', label: '', info: '' },
  { addr: 'A14.4', label: '', info: '' },
  { addr: 'A14.5', label: '', info: '' },
  { addr: 'A14.6', label: '', info: '' },
  { addr: 'A14.7', label: '', info: '' },
  { addr: 'A15.0', label: '', info: '' },
  { addr: 'A15.1', label: '', info: '' },
  { addr: 'A15.2', label: '', info: '' },
  { addr: 'A15.3', label: '', info: '' },
  { addr: 'A15.4', label: '', info: '' },
  { addr: 'A15.5', label: 'SNA', info: '' },
  { addr: 'A15.6', label: 'SNB', info: '' },
  { addr: 'A15.7', label: 'SNV', info: '' }
]
export const outputs3 = [
  { addr: 'A20.0', label: 'KEM', info: '' },
  { addr: 'A20.1', label: 'KBA', info: '' },
  { addr: 'A20.2', label: 'KXPE', info: '' },
  { addr: 'A20.3', label: 'SQA', info: '' },
  { addr: 'A20.4', label: 'TD', info: '' },
  { addr: 'A20.5', label: '', info: '' },
  { addr: 'A20.6', label: '', info: '' },
  { addr: 'A20.7', label: '', info: '' },
  { addr: 'A21.0', label: 'L1', info: '' },
  { addr: 'A21.1', label: 'L2', info: '' },
  { addr: 'A21.2', label: 'L3', info: '' },
  { addr: 'A21.3', label: 'L4', info: '' },
  { addr: 'A21.4', label: 'L5', info: '' },
  { addr: 'A21.5', label: 'RFE', info: '' },
  { addr: 'A21.6', label: 'RLN', info: '' },
  { addr: 'A21.7', label: 'RBE', info: '' },
  { addr: 'A22.0', label: 'SCA', info: '' },
  { addr: 'A22.1', label: 'SCB', info: '' },
  { addr: 'A22.2', label: 'SMA1', info: '' },
  { addr: 'A22.3', label: 'SMB1', info: '' },
  { addr: 'A22.4', label: 'SMA2', info: '' },
  { addr: 'A22.5', label: 'SMB2', info: '' },
  { addr: 'A22.6', label: '', info: '' },
  { addr: 'A22.7', label: 'LC', info: '' },
  { addr: 'A23.0', label: 'LK', info: '' },
  { addr: 'A23.1', label: 'LE', info: '' },
  { addr: 'A23.2', label: 'LB', info: '' },
  { addr: 'A23.3', label: 'RDY', info: '' },
  { addr: 'A23.4', label: 'RST', info: '' },
  { addr: 'A23.5', label: 'SDR', info: '' },
  { addr: 'A23.6', label: 'SDL', info: '' },
  { addr: 'A23.7', label: 'SDN', info: '' },
  { addr: 'A24.0', label: '', info: '' },
  { addr: 'A24.1', label: '', info: '' },
  { addr: 'A24.2', label: '', info: '' },
  { addr: 'A24.3', label: '', info: '' },
  { addr: 'A24.4', label: '', info: '' },
  { addr: 'A24.5', label: '', info: '' },
  { addr: 'A24.6', label: '', info: '' },
  { addr: 'A24.7', label: '', info: '' },
  { addr: 'A25.0', label: '', info: '' },
  { addr: 'A25.1', label: '', info: '' },
  { addr: 'A25.2', label: '', info: '' },
  { addr: 'A25.3', label: '', info: '' },
  { addr: 'A25.4', label: '', info: '' },
  { addr: 'A25.5', label: 'SNA', info: '' },
  { addr: 'A25.6', label: 'SNB', info: '' },
  { addr: 'A25.7', label: 'SNV', info: '' }
]
export const outputs4 = [
  { addr: 'A30.0', label: 'SBK1', info: '' },
  { addr: 'A30.1', label: '', info: '' },
  { addr: 'A30.2', label: '', info: '' },
  { addr: 'A30.3', label: '', info: '' },
  { addr: 'A30.4', label: '', info: '' },
  { addr: 'A30.5', label: '', info: '' },
  { addr: 'A30.6', label: '', info: '' },
  { addr: 'A30.7', label: '', info: '' },
  { addr: 'A31.0', label: 'T10-1', info: '' },
  { addr: 'A31.1', label: 'T2', info: '' },
  { addr: 'A31.2', label: 'T10-F', info: '' },
  { addr: 'A31.3', label: 'T10-2', info: '' },
  { addr: 'A31.4', label: 'KBA1', info: '' },
  { addr: 'A31.5', label: 'KBA2', info: '' },
  { addr: 'A31.6', label: 'SBK2', info: '' },
  { addr: 'A31.7', label: '', info: '' }
]
export const outputs5 = [
  { addr: 'A40.0', label: 'A', info: '' },
  { addr: 'A40.1', label: 'B', info: '' },
  { addr: 'A40.2', label: 'C', info: '' },
  { addr: 'A40.3', label: 'D', info: '' },
  { addr: 'A40.4', label: 'AD1', info: '' },
  { addr: 'A40.5', label: 'AD2', info: '' },
  { addr: 'A40.6', label: 'AD3', info: '' },
  { addr: 'A40.7', label: 'STR', info: '' },
  { addr: 'A41.0', label: '', info: '' },
  { addr: 'A41.1', label: '', info: '' },
  { addr: 'A41.2', label: 'TRA', info: '' },
  { addr: 'A41.3', label: 'TRB', info: '' },
  { addr: 'A41.4', label: 'KCS', info: '' },
  { addr: 'A41.5', label: 'KCV', info: '' },
  { addr: 'A41.6', label: 'KCH', info: '' },
  { addr: 'A41.7', label: 'TCR', info: '' },
  { addr: 'A42.0', label: '', info: '' },
  { addr: 'A42.1', label: '', info: '' },
  { addr: 'A42.2', label: '', info: '' },
  { addr: 'A42.3', label: '', info: '' },
  { addr: 'A42.4', label: '', info: '' },
  { addr: 'A42.5', label: '', info: '' },
  { addr: 'A42.6', label: 'LA', info: '' },
  { addr: 'A42.7', label: 'LC', info: '' }
]
export const merkers1 = [
  { addr: 'M0.0', label: '', info: '' },
  { addr: 'M0.1', label: '', info: '' },
  { addr: 'M0.2', label: '', info: '' },
  { addr: 'M0.3', label: '', info: '' },
  { addr: 'M0.4', label: '', info: '' },
  { addr: 'M0.5', label: '', info: '' },
  { addr: 'M0.6', label: '', info: '' },
  { addr: 'M0.7', label: '', info: '' },
  { addr: 'M1.0', label: '', info: '' },
  { addr: 'M1.1', label: '', info: '' },
  { addr: 'M1.2', label: '', info: '' },
  { addr: 'M1.3', label: '', info: '' },
  { addr: 'M1.4', label: '', info: '' },
  { addr: 'M1.5', label: '', info: '' },
  { addr: 'M1.6', label: '', info: '' },
  { addr: 'M1.7', label: '', info: '' },
  { addr: 'M2.0', label: '', info: '' },
  { addr: 'M2.1', label: '', info: '' },
  { addr: 'M2.2', label: '', info: '' },
  { addr: 'M2.3', label: '', info: '' },
  { addr: 'M2.4', label: '', info: '' },
  { addr: 'M2.5', label: '', info: '' },
  { addr: 'M2.6', label: '', info: '' },
  { addr: 'M2.7', label: '', info: '' },
  { addr: 'M3.0', label: '', info: '' },
  { addr: 'M3.1', label: '', info: '' },
  { addr: 'M3.2', label: '', info: '' },
  { addr: 'M3.3', label: '', info: '' },
  { addr: 'M3.4', label: '', info: '' },
  { addr: 'M3.5', label: '', info: '' },
  { addr: 'M3.6', label: '', info: '' },
  { addr: 'M3.7', label: '', info: '' },
  { addr: 'M4.0', label: '', info: '' },
  { addr: 'M4.1', label: '', info: '' },
  { addr: 'M4.2', label: '', info: '' },
  { addr: 'M4.3', label: '', info: '' },
  { addr: 'M4.4', label: '', info: '' },
  { addr: 'M4.5', label: '', info: '' },
  { addr: 'M4.6', label: '', info: '' },
  { addr: 'M4.7', label: '', info: '' },
  { addr: 'M5.0', label: '', info: '' },
  { addr: 'M5.1', label: '', info: '' },
  { addr: 'M5.2', label: '', info: '' },
  { addr: 'M5.3', label: '', info: '' },
  { addr: 'M5.4', label: '', info: '' },
  { addr: 'M5.5', label: '', info: '' },
  { addr: 'M5.6', label: '', info: '' },
  { addr: 'M5.7', label: '', info: '' },
  { addr: 'M6.0', label: '', info: '' },
  { addr: 'M6.1', label: '', info: '' },
  { addr: 'M6.2', label: '', info: '' },
  { addr: 'M6.3', label: '', info: '' },
  { addr: 'M6.4', label: '', info: '' },
  { addr: 'M6.5', label: '', info: '' },
  { addr: 'M6.6', label: '', info: '' },
  { addr: 'M6.7', label: '', info: '' },
  { addr: 'M7.0', label: '', info: '' },
  { addr: 'M7.1', label: '', info: '' },
  { addr: 'M7.2', label: '', info: '' },
  { addr: 'M7.3', label: '', info: '' },
  { addr: 'M7.4', label: '', info: '' },
  { addr: 'M7.5', label: '', info: '' },
  { addr: 'M7.6', label: '', info: '' },
  { addr: 'M7.7', label: '', info: '' }
]
export const alarms1 = [
  { class: 'A', label: 'AL1', info: '' },
  { class: 'A', label: 'AL2', info: '' },
  { class: 'A', label: 'AL3', info: '' },
  { class: 'A', label: 'AL4', info: '' },
  { class: 'A', label: 'AL5', info: '' },
  { class: 'A', label: 'AL6', info: '' },
  { class: 'A', label: 'AL7', info: '' },
  { class: 'A', label: 'AL8', info: '' },
  { class: 'A', label: 'AL9', info: '' },
  { class: 'A', label: 'AL10', info: '' },
  { class: 'A', label: 'AL11', info: '' },
  { class: 'A', label: 'AL12', info: '' },
  { class: 'A', label: 'AL13', info: '' },
  { class: 'A', label: 'AL14', info: '' },
  { class: 'A', label: 'AL15', info: '' },
  { class: 'A', label: 'AL16', info: '' },
  { class: 'A', label: 'AL17', info: '' },
  { class: 'A', label: 'AL18', info: '' },
  { class: 'A', label: 'AL19', info: '' },
  { class: 'A', label: 'AL20', info: '' },
  { class: 'A', label: 'AL21', info: '' },
  { class: 'A', label: 'AL22', info: '' },
  { class: 'A', label: 'AL23', info: '' },
  { class: 'A', label: 'AL24', info: '' },
  { class: 'A', label: 'AL25', info: '' },
  { class: 'A', label: 'AL26', info: '' },
  { class: 'A', label: 'AL27', info: '' },
  { class: 'A', label: 'AL28', info: '' },
  { class: 'A', label: 'AL29', info: '' },
  { class: 'A', label: 'AL30', info: '' },
  { class: 'A', label: 'AL31', info: '' },
  { class: 'A', label: 'AL32', info: '' },
  { class: 'A', label: 'AL33', info: '' },
  { class: 'A', label: 'AL34', info: '' },
  { class: 'A', label: 'AL35', info: '' },
  { class: 'A', label: 'AL36', info: '' },
  { class: 'A', label: 'AL37', info: '' },
  { class: 'A', label: 'AL38', info: '' },
  { class: 'A', label: 'AL39', info: '' },
  { class: 'A', label: 'AL40', info: '' },
  { class: 'A', label: 'AL41', info: '' },
  { class: 'A', label: 'AL42', info: '' },
  { class: 'A', label: 'AL43', info: '' },
  { class: 'A', label: 'AL44', info: '' },
  { class: 'A', label: 'AL45', info: '' },
  { class: 'A', label: 'AL46', info: '' },
  { class: 'A', label: 'AL47', info: '' },
  { class: 'A', label: 'AL48', info: '' },
  { class: 'A', label: 'AL49', info: '' },
  { class: 'A', label: 'AL50', info: '' },
  { class: 'A', label: 'AL51', info: '' },
  { class: 'A', label: 'AL52', info: '' },
  { class: 'A', label: 'AL53', info: '' },
  { class: 'A', label: 'AL54', info: '' },
  { class: 'A', label: 'AL55', info: '' },
  { class: 'A', label: 'AL56', info: '' },
  { class: 'A', label: 'AL57', info: '' },
  { class: 'A', label: 'AL58', info: '' },
  { class: 'A', label: 'AL59', info: '' },
  { class: 'A', label: 'AL60', info: '' },
  { class: 'A', label: 'AL61', info: '' },
  { class: 'A', label: 'AL62', info: '' },
  { class: 'A', label: 'AL63', info: '' },
  { class: 'A', label: 'AL64', info: '' }
]
export const alarms2 = [
  { class: 'B', label: 'AL1', info: '' },
  { class: 'B', label: 'AL2', info: '' },
  { class: 'B', label: 'AL3', info: '' },
  { class: 'B', label: 'AL4', info: '' },
  { class: 'B', label: 'AL5', info: '' },
  { class: 'B', label: 'AL6', info: '' },
  { class: 'B', label: 'AL7', info: '' },
  { class: 'B', label: 'AL8', info: '' },
  { class: 'B', label: 'AL9', info: '' },
  { class: 'B', label: 'AL10', info: '' },
  { class: 'B', label: 'AL11', info: '' },
  { class: 'B', label: 'AL12', info: '' },
  { class: 'B', label: 'AL13', info: '' },
  { class: 'B', label: 'AL14', info: '' },
  { class: 'B', label: 'AL15', info: '' },
  { class: 'B', label: 'AL16', info: '' },
  { class: 'B', label: 'AL17', info: '' },
  { class: 'B', label: 'AL18', info: '' },
  { class: 'B', label: 'AL19', info: '' },
  { class: 'B', label: 'AL20', info: '' },
  { class: 'B', label: 'AL21', info: '' },
  { class: 'B', label: 'AL22', info: '' },
  { class: 'B', label: 'AL23', info: '' },
  { class: 'B', label: 'AL24', info: '' },
  { class: 'B', label: 'AL25', info: '' },
  { class: 'B', label: 'AL26', info: '' },
  { class: 'B', label: 'AL27', info: '' },
  { class: 'B', label: 'AL28', info: '' },
  { class: 'B', label: 'AL29', info: '' },
  { class: 'B', label: 'AL30', info: '' },
  { class: 'B', label: 'AL31', info: '' },
  { class: 'B', label: 'AL32', info: '' },
  { class: 'B', label: 'AL33', info: '' },
  { class: 'B', label: 'AL34', info: '' },
  { class: 'B', label: 'AL35', info: '' },
  { class: 'B', label: 'AL36', info: '' },
  { class: 'B', label: 'AL37', info: '' },
  { class: 'B', label: 'AL38', info: '' },
  { class: 'B', label: 'AL39', info: '' },
  { class: 'B', label: 'AL40', info: '' },
  { class: 'B', label: 'AL41', info: '' },
  { class: 'B', label: 'AL42', info: '' },
  { class: 'B', label: 'AL43', info: '' },
  { class: 'B', label: 'AL44', info: '' },
  { class: 'B', label: 'AL45', info: '' },
  { class: 'B', label: 'AL46', info: '' },
  { class: 'B', label: 'AL47', info: '' },
  { class: 'B', label: 'AL48', info: '' },
  { class: 'B', label: 'AL49', info: '' },
  { class: 'B', label: 'AL50', info: '' },
  { class: 'B', label: 'AL51', info: '' },
  { class: 'B', label: 'AL52', info: '' },
  { class: 'B', label: 'AL53', info: '' },
  { class: 'B', label: 'AL54', info: '' },
  { class: 'B', label: 'AL55', info: '' },
  { class: 'B', label: 'AL56', info: '' },
  { class: 'B', label: 'AL57', info: '' },
  { class: 'B', label: 'AL58', info: '' },
  { class: 'B', label: 'AL59', info: '' },
  { class: 'B', label: 'AL60', info: '' },
  { class: 'B', label: 'AL61', info: '' },
  { class: 'B', label: 'AL62', info: '' },
  { class: 'B', label: 'AL63', info: '' },
  { class: 'B', label: 'AL64', info: '' }
]
export const alarms3 = [
  { class: 'T', label: 'AL1', info: '' },
  { class: 'T', label: 'AL2', info: '' },
  { class: 'T', label: 'AL3', info: '' },
  { class: 'T', label: 'AL4', info: '' },
  { class: 'T', label: 'AL5', info: '' },
  { class: 'T', label: 'AL6', info: '' },
  { class: 'T', label: 'AL7', info: '' },
  { class: 'T', label: 'AL8', info: '' },
  { class: 'T', label: 'AL9', info: '' },
  { class: 'T', label: 'AL10', info: '' },
  { class: 'T', label: 'AL11', info: '' },
  { class: 'T', label: 'AL12', info: '' },
  { class: 'T', label: 'AL13', info: '' },
  { class: 'T', label: 'AL14', info: '' },
  { class: 'T', label: 'AL15', info: '' },
  { class: 'T', label: 'AL16', info: '' },
  { class: 'T', label: 'AL17', info: '' },
  { class: 'T', label: 'AL18', info: '' },
  { class: 'T', label: 'AL19', info: '' },
  { class: 'T', label: 'AL20', info: '' },
  { class: 'T', label: 'AL21', info: '' },
  { class: 'T', label: 'AL22', info: '' },
  { class: 'T', label: 'AL23', info: '' },
  { class: 'T', label: 'AL24', info: '' },
  { class: 'T', label: 'AL25', info: '' },
  { class: 'T', label: 'AL26', info: '' },
  { class: 'T', label: 'AL27', info: '' },
  { class: 'T', label: 'AL28', info: '' },
  { class: 'T', label: 'AL29', info: '' },
  { class: 'T', label: 'AL30', info: '' },
  { class: 'T', label: 'AL31', info: '' },
  { class: 'T', label: 'AL32', info: '' },
  { class: 'T', label: 'AL33', info: '' },
  { class: 'T', label: 'AL34', info: '' },
  { class: 'T', label: 'AL35', info: '' },
  { class: 'T', label: 'AL36', info: '' },
  { class: 'T', label: 'AL37', info: '' },
  { class: 'T', label: 'AL38', info: '' },
  { class: 'T', label: 'AL39', info: '' },
  { class: 'T', label: 'AL40', info: '' },
  { class: 'T', label: 'AL41', info: '' },
  { class: 'T', label: 'AL42', info: '' },
  { class: 'T', label: 'AL43', info: '' },
  { class: 'T', label: 'AL44', info: '' },
  { class: 'T', label: 'AL45', info: '' },
  { class: 'T', label: 'AL46', info: '' },
  { class: 'T', label: 'AL47', info: '' },
  { class: 'T', label: 'AL48', info: '' },
  { class: 'T', label: 'AL49', info: '' },
  { class: 'T', label: 'AL50', info: '' },
  { class: 'T', label: 'AL51', info: '' },
  { class: 'T', label: 'AL52', info: '' },
  { class: 'T', label: 'AL53', info: '' },
  { class: 'T', label: 'AL54', info: '' },
  { class: 'T', label: 'AL55', info: '' },
  { class: 'T', label: 'AL56', info: '' },
  { class: 'T', label: 'AL57', info: '' },
  { class: 'T', label: 'AL58', info: '' },
  { class: 'T', label: 'AL59', info: '' },
  { class: 'T', label: 'AL60', info: '' },
  { class: 'T', label: 'AL61', info: '' },
  { class: 'T', label: 'AL62', info: '' },
  { class: 'T', label: 'AL63', info: '' },
  { class: 'T', label: 'AL64', info: '' }
]
