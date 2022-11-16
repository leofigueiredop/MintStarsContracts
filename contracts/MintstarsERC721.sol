// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import '@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol';

contract MintstarsNFT is
    Initializable,
    ERC721URIStorageUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    using CountersUpgradeable for CountersUpgradeable.Counter;

    CountersUpgradeable.Counter private _tokenIdsCounter;
    mapping(bytes32 => bool) public usedHash;

    event NFTImported(
        uint256 tokenId,
        string userId,
        address userAddress,
        string msNftId
    );
    event NFTExported(
        uint256 tokenId,
        string userId,
        address userAddress,
        string msNftId
    );


    function initialize() public initializer {
        __ERC721_init("MintStars", "MSNFT");
        __Ownable_init();
        _tokenIdsCounter.increment(); // starts from 1
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}

    function tokenIdsCounter() public view returns (uint256) {
        return _tokenIdsCounter.current();
    }

    function exportItem(
        string calldata tokenURI,
        string memory msNftId,
        string calldata userId,
        int256 tokenId,
        uint256 timestamp,
        address target,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public  returns (uint256) {
        // blockscope validation
        {
            // build params
            bytes32 msgHash = keccak256(
                abi.encodePacked(
                    target,
                    '/',
                    userId,
                    '/',
                    tokenId,
                    '/',
                    msNftId,
                     '/',
                    timestamp,
                     '/',
                    'EXPORT'
                )
            );
            // Validate
            validateMessage(owner(), msgHash, v, r, s);
        }
        if (tokenId > -1 && this.ownerOf(uint256(tokenId)) == address(this)) {
            super._transfer(
                address(this),
                target,
                uint256(tokenId)
            );
            emit NFTExported(
                uint256(tokenId),
                userId,
                target,
                msNftId
            );
            return uint256(tokenId);
        } else {
            uint256 newItemId = _tokenIdsCounter.current();
            _mint(target, newItemId);
            _setTokenURI(newItemId, tokenURI);
            _tokenIdsCounter.increment();
            
            emit NFTExported(
                newItemId,
                userId,
                target,
                msNftId
            );
            return newItemId;
        }
    }

    function importItem(
        string calldata msNftId,        
        string calldata userId,
        uint256 tokenId,
        uint256 timestamp,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public  returns (bool) {
        // blockscope validation
        {
            // build params
            bytes32 msgHash = keccak256(
                abi.encodePacked(
                    msg.sender,//userAddress
                    '/',
                    userId,
                    '/',
                    tokenId,
                    '/',
                    msNftId,
                    '/',
                    timestamp,
                    '/',
                    'IMPORT'
                )
            );

            // Validate
            validateMessage(owner(), msgHash, v, r, s);
        }
        super._transfer(
            msg.sender,
            address(this),
            tokenId
        );

        emit NFTImported(
            tokenId,
            userId,
            msg.sender,
            msNftId
        );
        
        return true;
    }

   function validateMessage(
        address _ownerAddress,
        bytes32 msgHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public returns (bool) {
        // Validate
        msgHash = keccak256(
            abi.encodePacked('\x19Ethereum Signed Message:\n32', msgHash)
        );
        require(
            isSigned(_ownerAddress, msgHash, v, r, s),
            'MintStars:: Invalid signature'
        );
        // Validate

        return true;
    }


    function isSigned(
        address _address,
        bytes32 msgHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal returns (bool) {
        if (usedHash[msgHash]) {
            return false;
        } else {
            if (ecrecover(msgHash, v, r, s) == _address) {
                usedHash[msgHash] = true;
                return true;
            } else {
                return false;
            }
        }
    }
}