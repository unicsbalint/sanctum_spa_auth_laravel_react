const AuthenticatedContent = (params) => {
    
    const token = localStorage.getItem("token");
    if(token){
        return (
            <>
                {params.children}
            </>
        )
    }
    else{
        return <></>
    }
   
}

export default AuthenticatedContent