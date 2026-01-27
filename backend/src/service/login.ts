import { users } from "../repository/login"
const bcrypt=require('bcrypt')

export const compararContrasenias=async (user:string,password:string)=>{
	 await bcrypt.compare(password,users.get(user),(err:any,result:any)=>{

	})
}
