export * from './default.service';
import { DefaultService } from './default.service';
export * from './default.serviceInterface'
export * from './sIFTADMIN.service';
import { SIFTADMINService } from './sIFTADMIN.service';
export * from './sIFTADMIN.serviceInterface'
export const APIS = [DefaultService, SIFTADMINService];
