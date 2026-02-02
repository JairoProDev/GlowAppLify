'use client';

import { useState } from 'react';
import { ExecutionBoard } from '@/lib/types';
import toast from 'react-hot-toast';

interface ExecutionBoardViewProps {
  board: ExecutionBoard;
  onBoardUpdated: (board: ExecutionBoard) => void;
  onStartDaily: () => void;
}

export default function ExecutionBoardView({ board, onBoardUpdated, onStartDaily }: ExecutionBoardViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBoard, setEditedBoard] = useState<ExecutionBoard>(board);

  const handleSave = () => {
    onBoardUpdated(editedBoard);
    setIsEditing(false);
    toast.success('Board updated successfully!');
  };

  const handleCancel = () => {
    setEditedBoard(board);
    setIsEditing(false);
  };

  const currentBoard = isEditing ? editedBoard : board;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Your Execution Board
          </h1>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Edit Board
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onStartDaily}
            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Start Daily Execution
          </button>
        </div>
      </div>

      {/* Layer 1: Vision */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-purple-600 mb-4">🎯 Vision</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Identity</label>
            {isEditing ? (
              <input
                type="text"
                value={currentBoard.vision.identity}
                onChange={(e) => setEditedBoard({
                  ...editedBoard,
                  vision: { ...editedBoard.vision, identity: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-lg italic text-gray-800">{currentBoard.vision.identity}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mantra</label>
            {isEditing ? (
              <input
                type="text"
                value={currentBoard.vision.mantra}
                onChange={(e) => setEditedBoard({
                  ...editedBoard,
                  vision: { ...editedBoard.vision, mantra: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            ) : (
              <p className="text-xl font-bold text-purple-600">{currentBoard.vision.mantra}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Future Self</label>
            {isEditing ? (
              <textarea
                value={currentBoard.vision.futureImage}
                onChange={(e) => setEditedBoard({
                  ...editedBoard,
                  vision: { ...editedBoard.vision, futureImage: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
            ) : (
              <p className="text-gray-700">{currentBoard.vision.futureImage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Layer 2: Goal */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">🎯 90-Day Goal</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">SMART Goal</label>
            {isEditing ? (
              <textarea
                value={currentBoard.goal.statement}
                onChange={(e) => setEditedBoard({
                  ...editedBoard,
                  goal: { ...editedBoard.goal, statement: e.target.value }
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
                rows={3}
              />
            ) : (
              <p className="text-lg text-gray-800">{currentBoard.goal.statement}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
              <p className="text-gray-800">{currentBoard.goal.type}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Deadline</label>
              <p className="text-gray-800">{new Date(currentBoard.goal.deadline).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Key Performance Indicators</label>
            <div className="space-y-2">
              {currentBoard.goal.kpis.map((kpi, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                  <span className="text-gray-800">{kpi.metric}:</span>
                  <span className="font-semibold text-blue-600">{kpi.target} {kpi.unit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layer 3: Execution */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Weekly Execution</h2>

        <div className="space-y-6">
          {currentBoard.execution.map((week) => (
            <div key={week.weekNumber} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Week {week.weekNumber}: {week.focus}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {Object.entries(week.days).map(([day, actions]) => (
                  <div key={day} className="bg-gray-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{day}</h4>
                    <ul className="space-y-2">
                      {actions.map((action) => (
                        <li key={action.id} className="text-sm">
                          {action.isOneThingAction && (
                            <span className="inline-block bg-yellow-200 text-yellow-900 text-xs px-2 py-1 rounded mb-1">
                              ONE THING
                            </span>
                          )}
                          <p className="text-gray-700">{action.description}</p>
                          <p className="text-gray-500 text-xs">{action.duration}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 4: Obstacles */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-orange-600 mb-4">⚠️ Obstacles & If-Then Plans</h2>

        <div className="space-y-3">
          {currentBoard.obstacles.map((obstacle, idx) => (
            <div key={idx} className="bg-orange-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900 mb-2">{obstacle.description}</p>
              <p className="text-gray-700 italic">{obstacle.ifThenPlan}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Layer 5: Habits */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4">🔄 Daily Habits</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentBoard.habits.map((habit, idx) => (
            <div key={idx} className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-900 capitalize mb-2">
                {habit.type === 'deepwork' ? 'Deep Work' : habit.type}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{habit.time}</p>
              <p className="text-gray-700">{habit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
