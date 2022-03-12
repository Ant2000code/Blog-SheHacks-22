import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart=()=>{
    
    return{

        type:actionTypes.AUTH_START
    }
}
export const authSuccess=token=>{
    
    return{
        type:actionTypes.AUTH_SUCCESS,
        token:token
    }
    
}
    
export const authFail=error=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout=()=>
{
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('DetailsFetched');
    localStorage.removeItem('PreferenceSet');
    console.log("hey");
    
    return{
         type:actionTypes.AUTH_LOGOUT
        

    };
   
}
export const checkAuthTimeout=expirationTime=>{
    return dispatch=>{
        setTimeout(()=>
        {
            dispatch(logout());
        },expirationTime*1000)
    }
}
export const authLogin=(username, password)=>{
    return dispatch=>{
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/login/',
    {username: username,
    password: password
    })    
    .then(res => {
        const token=res.data.key;
        const expirationDate= new Date(new Date().getTime()+3600*1000);
        localStorage.setItem('token',token);
        //localStorage.setItem('userId',res.data.pk);
        localStorage.setItem('expirationDate',expirationDate);
        console.log('token:'+token);
        //console.log(res.data.pk);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600))
        let data;
        let len;
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: "Token "+localStorage.getItem('token')
        }
        // axios.get('http://127.0.0.1:8000/details/user/')
        //   .then(res => {
        //     //localStorage.setItem('detailsOfUser',res.data);
        //      data=res.data
        //      len=res.data.length;
        //     //console.log(res.data);
        //     //localStorage.setItem('userId',res.data.pk);
        //     if(len!= 0){
        //     localStorage.setItem('DetailsFetched','true')
            
        //     }
        //     console.log("From auth"+len);
        //     console.log(localStorage.getItem('DetailsFetched'));
        //   })
        //   .catch(err=>{
            
        //     alert("Detail not fetched! "+ err);
        //    })

          
    })
    .catch(err=>{
        dispatch(authFail(err))
        alert("Login unsuccessful! ");
    })
    }
}

export const authSignup=(username,email, password1,password2)=>{
    return dispatch=>{
    dispatch(authStart());
    axios.post('http://127.0.0.1:8000/rest-auth/registration/',
    {username: username,
        email:email,
    password1: password1,
    password2: password2,
    })    
    .then(res => {
        const token=res.data.key;
        const expirationDate= new Date(new Date().getTime()+3600*1000);
        //localStorage.setItem('token',token);
       // localStorage.setItem('expirationDate',expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600))
    })
    .catch(err=>{
        alert("Registration unsuccessful! Check your password ");
        dispatch(authFail(err))
    })
    }
}
export const authGet=(firstName,lastName,gender,dob,occupation,bio)=>{
    navigator.geolocation.getCurrentPosition(function (position) {
        const lat=position.coords.latitude.toFixed(4);
        const lng=position.coords.longitude.toFixed(4);
        localStorage.setItem('lat',lat);
        localStorage.setItem('lng',lng);
       console.log("Latitude is :", lat);
       console.log("Longitude is :", lng);
     });
    return dispatch=>{
        axios.defaults.headers = {
            "Content-type": "multipart/form-data",
            //'Accept': 'application/json',
            Authorization: "Token "+localStorage.getItem('token'),
         }
        axios.post('http://127.0.0.1:8000/details/user/',
        {   
            firstName:firstName,
            lastName:lastName,
            gender:gender,
            dob:dob,
            occupation:occupation,
            bio:bio,
            latitude:localStorage.getItem('lat'),
            longitude:localStorage.getItem('lng'),
            

          
        }).then(res=>{
            console.log("Details done!!");
            localStorage.removeItem('lat');
            localStorage.removeItem('lng');
            localStorage.removeItem('userId');
        })
        .catch(err=>{
          console.log(err);
        })
    }
}
export const authCheckState=()=>{
 return dispatch=>{
     const token =localStorage.getItem('token');
     if(token === undefined){
         dispatch(logout());
     }else{
         const expirationDate = new Date(localStorage.getItem('expirationDate'))
           if(expirationDate <= new Date() ){
               dispatch(logout());
           }else{
               dispatch(authSuccess(token));
               dispatch(checkAuthTimeout((expirationDate.getTime() -new Date().getTime())/1000));
           }
        }
 }

}

