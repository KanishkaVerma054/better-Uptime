import { beforeAll, describe, expect, it } from "bun:test";
import axios from "axios";
import { createUser } from "./lib/testUtils";
import { BACKEND_URL } from "./lib/config";

// let BACKEND_URL = "http://localhost:3000"

describe("Website get created", () => {
    let token: string;

    beforeAll(async() => {
        const data = await createUser();
        token = data.jwt;
    })

    it("Website not created if url is not present", async() => {

        try {
            await axios.post(`${BACKEND_URL}/website`, {

            }, {
                headers: {
                    Authorization: token
                }
            })
            expect(false, "Website created when it shouldn't")
        } catch (e) {
            
        }

    })

    it("Website is created if url & header is present", async() => {
        const response = await axios.post(`${BACKEND_URL}/website`, {
            url: "http://google.com"
        }, {
            headers: {
                Authorization: token
            }
        })
        expect(response.data.id).not.toBeNull()   
    })

    it("Website is not created if header is not present", async() => {
        
        try {
            const response = await axios.post(`${BACKEND_URL}/website`, {
                url: "http://google.com"
            })
            expect(false, "Website shouldn't be created if header is not present")
        } catch (e) {
            
        }
    })
})

describe("Can't fetch website", () => {
    let userId1: string, token1: string;
    let userId2: string, token2: string;

    beforeAll(async () => {
        const user1 = await createUser();
        const user2 = await createUser();
        
        userId1 = user1.id;
        token1 = user1.jwt;

        userId2 = user2.id;
        token2 = user2.id;
    });

    it("Is able to fetch website that the user created", async() => {
        const websiteResponse = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://googhdjjhsdsdsdhdjhdj.com/"
        }, {
            headers: {
                Authorization: token1
            }
        })

        const getWebsiteResponse = await axios.get(`${BACKEND_URL}/status/${websiteResponse.data.id}`, {
            headers: {
                Authorization: token1
            }
        });
        expect(getWebsiteResponse.data.id).toBe(websiteResponse.data.id);
        expect(getWebsiteResponse.data.user_id).toBe(userId1);
    })

    it("Can't access website created by other user", async() => {
        const websiteResponse = await axios.post(`${BACKEND_URL}/website`, {
            url: "https://googhdjjhsdsdsdhdjhdj.com/"
        }, {
            headers: {
                Authorization: token1
            }
        })

        try {
            await axios.get(`${BACKEND_URL}/status/${websiteResponse.data.id}`, {
                headers: {
                    Authorization: token1
                }
            });
            expect(false, "Shouldn't be able to access website of a different user")
        } catch (e) {
            
        }
    })
})