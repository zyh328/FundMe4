const{ethers, deployments, getNamedAccounts}=require("hardhat")
const { assert,expect } = require("chai")
const helpers=require("@nomicfoundation/hardhat-network-helpers")
const {devlopmentChains} = require("../../helper-hardhat-config")

devlopmentChains.includes(network.name) 
? describe.skip
:describe("test fundme contract",async function(){
    let fundMe
    let firstAccount
    beforeEach(async function(){
        await deployments.fixture(["all"])
        firstAccount=(await getNamedAccounts()).firstAccount
        const fundMeDeployment=await deployments.get("FundMe")
        fundMe=await ethers.getContractAt("FundMe",fundMeDeployment.address)
    })
    
    //test fund and getFund successfully
    it("test fund and getFund successfully",
        async function(){
        //make sure the target reached
            await fundMe.fund({value:ethers.parseEther("0.5")})
        //make sure the window is closed
            await new Promise(resolve => setTimeout(resolve, 181*1000))
        // make sure we can get receipt
            const getFundTx=await fundMe.getFund()
            const getFundReceipt=await getFundTx.wait()
            expect(getFundReceipt)
                .to.be.emit(fundMe,"FundWithdrawByOwner")
                .withArgs(firstAccount,ethers.parseEther("0.5"))
        }
    )
    //test fund and refund successfully
    it("test fund and refund successfully",
        async function(){
            // make sure target not reached
            await fundMe.fund({value:ethers.parseEther("0.1")})
            //make sure window closed
            await new Promise(resolve => setTimeout(resolve, 181*1000))
            // make sure we can get receipt
            const reFundTx=await fundMe.refund()
            const reFundReceipt=await reFundTx.wait()
            expect(reFundReceipt)
                .to.be.emit(fundMe,"RefundByFunder")
                .withArgs(firstAccount,ethers.parseEther("0.1"))   
        }
    )


})