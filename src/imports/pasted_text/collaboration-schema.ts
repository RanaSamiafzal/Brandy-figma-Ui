import mongoose from "mongoose";

const deliverableSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    platform: {
        type: String,
        enum: [
            "instagram",
            "youtube",
            "tiktok",
            "twitter",
            "facebook",
            "linkedin",
            "other"
        ]
    },

    description: String,

    dueDate: Date,

    status: {
        type: String,
        enum: [
            "pending",
            "submitted",
            "revision_requested",
            "approved",
            "completed"
        ],
        default: "pending"
    },

    submissionFiles: [
        {
            url: String,
            fileType: String,
            uploadedAt: Date
        }
    ],

    revisionNotes: String

}, { _id: true });



const collaborationSchema = new mongoose.Schema({

    requestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CollaborationRequest",
        required: true,
        index: true
    },

    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },

    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    influencerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },

    title: {
        type: String,
        required: true
    },

    description: String,

    budget: {
        type: Number
    },

    currency: {
        type: String,
        default: "USD"
    },

    deliverables: [deliverableSchema],

    startDate: {
        type: Date,
        default: Date.now
    },

    deadline: Date,

    status: {
        type: String,
        enum: [
            "active",
            "in_progress",
            "review",
            "completed",
            "cancelled"
        ],
        default: "active",
        index: true
    },

    progress: {
        type: Number,
        default: 0
    },

    brandApproved: {
        type: Boolean,
        default: false
    },

    influencerApproved: {
        type: Boolean,
        default: false
    },

    attachments: [
        {
            url: String,
            fileType: String,
            uploadedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            uploadedAt: Date
        }
    ],

    notes: {
        brandNotes: String,
        influencerNotes: String
    },

    completedAt: Date

}, { timestamps: true });



export default mongoose.model("Collaboration", collaborationSchema);