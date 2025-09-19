import axios from "axios";
import { describe, expect, it } from "bun:test";
import { BACKEND_URL } from "./lib/config";

const USER_NAME = Math.random().toString();

describe("Signup endpoints", () => {
    it("Isn't able to sign up if body is incorrect", async() => {
        try{
            await axios.post(`${BACKEND_URL}/user/signup`, {
                username: USER_NAME,
                password: "password"
            })
            expect(false, "Control shouldn't reach here")
        } catch(e) {
            
        }
        
    })
    it("Is able to sign up if body is correct", async() => {
        try{
            const res = await axios.post(`${BACKEND_URL}/user/signup`, {
                username: USER_NAME,
                password: "password"
            })
            expect(res.status).toBe(200);
            expect(res.data.id).toBeDefined();
        } catch(e) {
            
        }
        
    })
})

describe("Signin endpoints", () => {
    it("Isn't able to sign in if body is incorrect", async() => {
        try{
            await axios.post(`${BACKEND_URL}/user/signin`, {
                username: USER_NAME,
                password: "password"
            })
            expect(false, "Control shouldn't reach here")
        } catch(e) {
            
        }
        
    })
    it("Is able to sign in if body is correct", async() => {
        try{
            const res = await axios.post(`${BACKEND_URL}/user/signin`, {
                username: USER_NAME,
                password: "password"
            })
            expect(res.status).toBe(200);
            expect(res.data.jwt).toBeDefined();
        } catch(e) {
            
        }
        
    })
})