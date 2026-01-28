export const users=new Map()
export const insertarUser=(user:string,hash:string)=>{
	users.set(user,hash)
}

export const getHash=(user:string)=>{
	return users.get(user)
}
