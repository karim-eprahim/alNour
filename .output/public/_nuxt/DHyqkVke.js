import{b4 as e,G as u,n as a}from"./AS5pgP4T.js";const n=e(t=>{if(["/auth/login","/auth/register"].includes(t.path))return;if(!u().isAuthenticated)return a("/auth/login")});export{n as default};
