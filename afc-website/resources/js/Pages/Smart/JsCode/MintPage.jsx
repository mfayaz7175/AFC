import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Head, usePage } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { MintAnimation, WaitAnimation } from '../../../Components/animations/Loading';
import afcContractABI from '../../../afcContractABI.jsx';
import '../CssCode/MintPage.css';

export default function MintPage() {
  const { questions: initialQuestions, activeTopics } = usePage().props;
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions || []);
  const [answers, setAnswers] = useState({});
  const [mintAddress, setMintAddress] = useState('');

  // Split into written vs. multiple-choice
  const writtenQuestions = questions.filter(q => q.type !== 'four-answer');
  const multipleChoiceQuestions = questions.filter(q => q.type === 'four-answer');

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then(accounts => {
          if (accounts.length > 0) {
            setMintAddress(accounts[0]);
          } else {
            setMessage('No accounts found in MetaMask.');
          }
        })
        .catch(err => console.error('Error requesting accounts: ', err));
    } else {
      setMessage('MetaMask not detected. Please install it.');
    }
  }, []);

  const handleAnswerChange = (e, questionId) => {
    setAnswers(prev => ({ ...prev, [questionId]: e.target.value }));
  };

  const handleMint = async () => {
    // Count correct written answers
    const correctCount = questions.filter(q => {
      const userAnswer = (answers[q.id] || '').trim().toLowerCase();
      const correctAnswer = q.correct_answer.trim().toLowerCase();
      return userAnswer === correctAnswer;
    }).length;

    let mintAmount;
    if (correctCount === 5) mintAmount = 100;
    else if (correctCount >= 3) mintAmount = 60;
    else if (correctCount >= 2) mintAmount = 30;
    else if (correctCount >= 1) mintAmount = 15;
    else {
      setMessage('You need to answer at least 1 question correctly to mint tokens.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
      const signer = provider.getSigner();
      const afcToken = new ethers.Contract(
        '0x849D90FF07dAfC379e3fdD79C1F50a65636ccEE7',
        afcContractABI,
        signer
      );

      const amountInWei = ethers.utils.parseUnits(mintAmount.toString(), 18);

      if (!mintAddress) {
        setMessage('Mint address not found.');
        setIsLoading(false);
        return;
      }

      const tx = await afcToken.mint(mintAddress, amountInWei, { gasLimit: 2000000 });
      await tx.wait();

      const balance = await afcToken.balanceOf(mintAddress);
      const humanReadableBalance = ethers.utils.formatUnits(balance, 18);

      setMessage(
        `Successfully minted ${mintAmount} AFC to ${mintAddress}. New balance: ${humanReadableBalance} AFC.`
      );

      setTimeout(() => {
        Inertia.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      if (err.code === 'CALL_EXCEPTION') {
        setMessage('Transaction reverted. Check contract permissions or conditions.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setMessage('Insufficient funds in your account to pay for gas.');
      } else {
        setMessage('Error: ' + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-white font-semibold text-lg leading-tight">
          <i className="fas fa-coins mr-2 text-white"></i> Mint AfCoin
        </h2>
      }
    >
      <Head title="Mint AfCoin" />

      {/* Glass-morphism container */}
      <div
        className="relative max-w-3xl mx-auto mt-8 p-6 text-white rounded-lg transform transition-transform hover:scale-105"
        style={{
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Blurred gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-zinc-900 opacity-50"
          style={{ filter: 'blur(12px)' }}
        />

        {/* Content layer */}
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white">
              <i className="fas fa-coins text-white"></i> Mint AfCoin
            </h3>
          </div>

          {questions.length === 0 ? (
            <div className="flex flex-col items-center justify-center my-12">
              <i className="fas fa-hourglass-half fa-3x mb-4"></i>
              <p className="text-lg mb-4">
                Please wait until the mining process begins. <br />
                <i className="fas fa-smile"></i> Thank you for your patience.
              </p>
              {/* Centered, larger WaitAnimation */}
              <div className="flex items-center justify-center">
                <div className="transform scale-150">
                  <WaitAnimation />
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-center text-lg mb-4">
                Answer the questions about{' '}
                <strong className="text-yellow-500">{activeTopics}</strong> to mint your tokens.
              </p>

              <form>
                {/* Written-answer questions */}
                {writtenQuestions.length > 0 && (
                  <>
                    <h5 className="mt-4 text-lg font-semibold">
                      <i className="fas fa-pencil-alt mr-2"></i> Written Answer Questions
                    </h5>
                    {writtenQuestions.map((q) => (
                      <div key={q.id} className="mb-4">
                        <label className="block text-sm font-medium text-white">{q.text}</label>
                        <input
                          type="text"
                          value={answers[q.id] || ''}
                          placeholder="Enter your answer"
                          onChange={(e) => handleAnswerChange(e, q.id)}
                          className="mt-1 block w-full px-4 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
                        />
                      </div>
                    ))}
                  </>
                )}

                {/* Multiple-choice questions */}
                {multipleChoiceQuestions.length > 0 && (
                  <>
                    <h5 className="mt-4 text-lg font-semibold">
                      <i className="fas fa-check-circle mr-2"></i> Multiple Choice Questions
                    </h5>
                    {multipleChoiceQuestions.map((q) => (
                      <div key={q.id} className="mb-4">
                        <label className="block text-sm font-medium text-white">{q.text}</label>
                        <div className="space-y-2">
                          {q.options.map((option, idx) => (
                            <div key={idx} className="flex items-center">
                              <input
                                type="radio"
                                id={`option-${q.id}-${idx}`}
                                name={q.id.toString()}
                                value={option}
                                checked={answers[q.id] === option}
                                onChange={(e) => handleAnswerChange(e, q.id)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`option-${q.id}-${idx}`}
                                className="text-white"
                              >
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleMint}
                  disabled={isLoading}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      {/* Wrap animation in a scaled-down container */}
                      <div className="transform">
                        <MintAnimation />
                      </div>
                      <span className="ml-2">Minting...</span>
                    </div>
                  ) : (
                    'Mint Tokens'
                  )}
                </button>
                </div>
              </form>
            </>
          )}

          {message && (
            <div
              className={`mt-6 p-4 rounded-lg text-center ${
                message.includes('Error') ? 'bg-red-600' : 'bg-green-600'
              }`}
            >
              <p className="text-white">{message}</p>
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
