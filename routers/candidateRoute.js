const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const Candidate = require('./../models/candidate');
const {jwtAuthMiddleware, generateToken} =require('./../jwt');

//first check the user is admin or not
const checkAdminRole = async (userID) => {
    try{
        const user = await User.findById(userID);
        if(user.role === 'admin'){
            return true;
        };
    }catch(err){
        return false;
    }
}


//POST route to add a candidate
router.post('/',jwtAuthMiddleware, async (req,res) => {
    try{

        if(! (await checkAdminRole(req.user.id))){
           // console.log("admin role not found");
            return res.status(403).json({message : 'user does not have admin role'});
        }

        const data = req.body; //Assuming the request body contains the candidate data

        //Create a new candidate document using the mongoose model
        const newCandidate = new Candidate(data);

        //Save the new candidate to the data base
        const response = await newCandidate.save();
        console.log('data saved');
        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
})


//update in candidate
router.put('/:candidateID',jwtAuthMiddleware, async (req, res) => {
    try{
        if(!checkAdminRole(req.user.id))
            return res.status(403).json({message: 'user does  not have admin role'});

        const candidateID = req.params.candidateID;  //Extract the id from the URL parameter

        const updatedCandidateData = req.body; //Update data for the person

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new : true, //Return the updated document
            runValidators : true, // Run Mongoose  validation
        })

        if(!response){
            return res.status(404).json({error : 'Candidate not found'});
        }

        console.log('candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})


//Delete candidate
router.delete('./:candidateID',jwtAuthMiddleware, async (req,res)=> {
    try{
        if(!checkAdminRole(req.user.id)){
            return res.status(403).json({message: 'user does not have admin role'});
        }
        const candidateID = req.params.candidateID; //Extract the id from the URL parameter

        const response = await Candidate.findByIdAndDelete(candidateID);
        if(!response){
            return res.status(404).json({error : 'Candidate not found'});
        }

        console.log('candidate deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
})


//let's start voting
router.post('/vote/:candidateID', jwtAuthMiddleware, async (req,res)=> {
    //no admin can vote
    //user can only  vote once

      const candidateID = req.params.candidateID;
      const userID = req.user.id;

    try{
        //find the candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if(!candidate){
            return res.status(404).json({message: 'Candidate not found'});
        }

        const user = await User.findById(userID);
        if(!user){
            return res.status(404).json({message : 'user not found'});
        }

        if(user.isVoted){
            res.status(400).json({message : 'You have already voted'});
        }

        if(user.role == 'admin'){
            res.status(400).json({message : 'admin is not allowed'});
        }

        //Update the candidate document to record the vote
        candidate.votes.push({user: userID})
        candidate.voteCount++;
        await candidate.save();


        //update the user document
        user.isVoted = true
        await user.save();

        res.status(200).json({message : 'Vote recorded successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

module.exports = router;

