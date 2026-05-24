import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };

        // This is to check if the user has already applied for the job

        const existingApplication = await Application.findOne({job:jobId, applicant:userId});

        if(existingApplication){
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            })
        }

        // Check if the job exists

        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }

        // Create a new application

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get all the applied jobs for a user

export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// For Admin to see all the applications for a job

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job) {
            return res.status(404).json({
                message: "Job Not found",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

// For Updates Status (for applicant)
// This can be later changed to also send a notification (Email) to the applicant

export const updateStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            })
        };
        
        // Find the application by applicant Id

        const application = await Application.findOne({_id:applicationId});

        if(!application) {
            return res.status(404).json({
                message: "Application Not found",
                success: false
            })
        };

        // Update the status of the application

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}