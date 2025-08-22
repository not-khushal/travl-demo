
'use client';

import { motion } from 'framer-motion';

interface VoteResultsProps {
  votes: {
    up: number;
    maybe: number;
    down: number;
  };
}

export function VoteResults({ votes }: VoteResultsProps) {
  const totalVotes = votes.up + votes.maybe + votes.down;
  if (totalVotes === 0) {
    return null;
  }

  const upPercentage = (votes.up / totalVotes) * 100;
  const maybePercentage = (votes.maybe / totalVotes) * 100;
  const downPercentage = (votes.down / totalVotes) * 100;

  return (
    <div className="w-full h-1.5 rounded-full bg-muted flex overflow-hidden mt-2">
      <motion.div
        className="h-full bg-green-500"
        initial={{ width: 0 }}
        animate={{ width: `${upPercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="h-full bg-yellow-500"
        initial={{ width: 0 }}
        animate={{ width: `${maybePercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      />
      <motion.div
        className="h-full bg-red-500"
        initial={{ width: 0 }}
        animate={{ width: `${downPercentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
      />
    </div>
  );
}
