import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mic, MicOff } from "lucide-react";
import InterviewInstructions from "../../components/ui/InterviewInstructions";
import { AuthContext } from "../../context/AuthContext";
import Vapi from '@vapi-ai/web';
import { assistantOptions } from "../../utils/assistantOptions";
import AlertBox from "../../components/common/AlertBox";
import ItemNotFound from "../../components/ui/ItemNotFound";
import Loader from "../../components/common/Loader";
import { FeedbackContext } from "../../context/FeedbackContext";
import { JobContext } from "../../context/JobContext";

export default function Interview() {
    const { user } = useContext(AuthContext);
    const { generateFeedback, generatingFeedback } = useContext(FeedbackContext);
    const { jobs } = useContext(JobContext);
    
    const { jobId } = useParams();
    const job = jobs.find((j) => j._id === jobId);

    const navigate = useNavigate();

    const [readInstructions, setReadInstructions] = useState(false);
    const [interviewStarted, setInterviewStarted] = useState(false);
    const [conversation, setConversation] = useState("");
    const [micOn, setMicOn] = useState(false);
    const [showTokenAlert, setShowTokenAlert] = useState(false);
    const [showEndAlert, setShowEndAlert] = useState(false);

    const vapiRef = useRef(null);

    useEffect(() => {
        const vapi = new Vapi(import.meta.env.VITE_VAPI_API_KEY);
        vapiRef.current = vapi;

        const onStart = () => console.log('Call started');
        const onEnd = () => console.log('Call ended');
        const onMessage = (message) => {
            setConversation(prev => prev + (message?.transcript || ""));
        };

        vapi.on('call-start', onStart);
        vapi.on('call-end', onEnd);
        vapi.on('message', onMessage);

        return () => {
            vapi.off('call-start', onStart);
            vapi.off('call-end', onEnd);
            vapi.off('message', onMessage);
            vapi.stop();
        };
    }, []);

    const handleStartInterview = () => {
        if (!micOn) {
            alert("Please turn on the microphone before starting.");
            return;
        }
        if (user.tokens < 1) {
            setShowTokenAlert(true);
            return;
        }

        setInterviewStarted(true);
        vapiRef.current?.start(assistantOptions(job.title, user.firstName));
    };

    const handleConfirmedEndInterview = async () => {
        if (!vapiRef.current) return;
        await vapiRef.current.stop();
        setInterviewStarted(false);
        await generateFeedback(conversation, job);
    };

    if (!job) return <ItemNotFound text="Job Not Found" />;

    if(!readInstructions) return <InterviewInstructions setReadInstructions={setReadInstructions} 
    jobTitle= {job.title} company={job.company} />

    if(generatingFeedback) return <Loader text="Generating feedback, please wait..." />;

    // --- Components ---
    function CandidatePanel() {
        return (
            <div className="border rounded-xl p-6 text-center shadow-md bg-white">
                <h3 className="text-xl font-semibold text-gray-900">{user.firstName || "Candidate"}</h3>
                <p className="text-gray-500 mb-4 text-sm">Candidate</p>
                <img src={user.image || "/no-user.png"} alt="Candidate" className="w-24 h-24 rounded-full mx-auto" />
                <p className={`mt-2 flex items-center justify-center text-sm font-medium ${micOn ? 'text-green-500' : 'text-red-500'}`}>
                    <span className={`${micOn ? 'bg-green-500' : 'bg-red-500'} h-2 w-2 rounded-full mr-2`} />
                    {micOn ? 'Mic On' : 'Mic Off'}
                </p>
            </div>
        );
    }

    function AIInterviewer() {
        return (
            <div className="border rounded-xl p-6 text-center shadow-md bg-white">
                <h3 className="text-xl font-semibold text-gray-900">Reva (AI)</h3>
                <p className="text-green-700 mb-4 text-sm">AI Interviewer</p>
                <img src="/AI_Interviewer.jpg" alt="AI Interviewer" className="w-24 h-24 rounded-full mx-auto" />
            </div>
        );
    }

    function Controls() {
        return (
            <div className="border rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 shadow-md bg-white">
                <button
                    onClick={() => setMicOn(prev => !prev)}
                    className={`p-4 rounded-full shadow-md transition ${micOn ? 'bg-green-100 text-green-700' : 'bg-red-500 text-white'}`}
                >
                    {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>
                <button
                    onClick={handleStartInterview}
                    disabled={interviewStarted}
                    className={`px-8 py-3 rounded-lg font-semibold shadow transition ${interviewStarted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                >
                    Start Interview
                </button>
                <button
                    onClick={() => setShowEndAlert(true)}
                    disabled={!interviewStarted}
                    className={`px-8 py-3 rounded-lg font-semibold shadow transition ${!interviewStarted ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    End Interview
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-6">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Interview Practice
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        {job.title} at {job.company}
                    </p>
                </div>
                <button
                    className="w-full sm:w-auto border border-green-500 text-green-600 text-sm font-medium px-4 py-2 rounded-md hover:bg-green-100 transition"
                    onClick={() => setReadInstructions(false)}
                >
                    View Instructions
                </button>
            </div>

            {/* Job Info */}
            <div className="border rounded-lg p-5 mb-8 shadow-sm">
                <h2 className="font-semibold text-xl text-gray-800">{job.title}</h2>
                <p className="text-sm text-gray-500 mt-1">{job.company} • {job.location}</p>
                <div className="mt-3 space-x-2">
                    <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{job.role}</span>
                    <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full">Technology</span>
                </div>
            </div>

            {/* Interview Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <AIInterviewer />
                <CandidatePanel />
            </div>

            <Controls />

            {/* Alerts */}
            {showTokenAlert && (
                <AlertBox
                    visible={true}
                    title="Not Enough Tokens"
                    text="You don't have enough tokens to start the interview. Please purchase more tokens to continue."
                    confirmLabel="Purchase tokens"
                    cancelLabel="Cancel"
                    confirmColor="orange"
                    onCancel={() => setShowTokenAlert(false)}
                    onConfirm={() => navigate('/subscription')}
                />
            )}

            {showEndAlert && (
                <AlertBox
                    visible={true}
                    title="End Interview"
                    text="Are you sure you want to end the interview? You will not be able to continue."
                    confirmLabel="Yes, End"
                    cancelLabel="No, Cancel"
                    confirmColor="red"
                    onCancel={() => setShowEndAlert(false)}
                    onConfirm={async () => {
                        setShowEndAlert(false);
                        await handleConfirmedEndInterview();
                    }}
                />
            )}
        </div>
    );
}
