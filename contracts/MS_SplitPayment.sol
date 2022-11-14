// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./ERC20Permit.sol";

contract  MS_SplitPayment {
    uint256 MAX_INT = 933120000000;
    constructor() {
        
    }

    function SplitPayment(
        address[6] calldata tokenCreatorMsSellerUserSpender_addr,
        uint256[3] calldata creatorMsSeller_value,
       uint8 v, bytes32 r, bytes32 s
    ) public returns (bool){
        ERC20Permit token =  ERC20Permit(tokenCreatorMsSellerUserSpender_addr[0]);
        uint256 totalValue = creatorMsSeller_value[0] + creatorMsSeller_value[1] + creatorMsSeller_value[2];
        require(
            token.balanceOf(tokenCreatorMsSellerUserSpender_addr[4]) >= totalValue,
            "MS_SplitPayment::Insufficient funds"
        );
        
        token.permit(
            tokenCreatorMsSellerUserSpender_addr[4],
            tokenCreatorMsSellerUserSpender_addr[5],
            totalValue,
            MAX_INT,
            v,r,s 
        ); 

       
        require(
            token.allowance(
                tokenCreatorMsSellerUserSpender_addr[4],
                tokenCreatorMsSellerUserSpender_addr[5]
            ) >= totalValue,
            "MS_SplitPayment::Insufficient allowance"
        );

        
        //seller value
        token.transferFrom( 
            tokenCreatorMsSellerUserSpender_addr[4],
            tokenCreatorMsSellerUserSpender_addr[3],
            creatorMsSeller_value[2]
        );

        //MS value
        token.transferFrom(
            tokenCreatorMsSellerUserSpender_addr[4],
            tokenCreatorMsSellerUserSpender_addr[2],
            creatorMsSeller_value[1]
        );
        
        //creator value
        token.transferFrom(
            tokenCreatorMsSellerUserSpender_addr[4],
            tokenCreatorMsSellerUserSpender_addr[1],
            creatorMsSeller_value[0]
        );

        return true;
    }
}