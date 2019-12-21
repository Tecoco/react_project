import {ADDPERSON} from '../action_types';
//这里的action 由store管理，然后直接交给reducer处理
export const addPerson = value => ({type: ADDPERSON, data: value});
