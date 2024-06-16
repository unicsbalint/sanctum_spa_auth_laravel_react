const NotAuthenticated = (params) => {
    const token = localStorage.getItem("token");
    if(!token){
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

export default NotAuthenticated;