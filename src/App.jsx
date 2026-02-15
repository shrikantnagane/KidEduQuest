import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard';
import LevelSelection from './pages/LevelSelection';
import ContentIndex from './pages/ContentIndex';
import ReadingModule from './pages/modules/ReadingModule';
import WritingModule from './pages/modules/WritingModule';
import ActivityModule from './pages/modules/ActivityModule';
import GamesModule from './pages/modules/GamesModule';
import CodingModule from './pages/modules/CodingModule';
import UserProfile from './pages/UserProfile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/levels" element={<LevelSelection />} />
            <Route path="/content" element={<ContentIndex />} />
            <Route path="/module/reading" element={<ReadingModule />} />
            <Route path="/module/writing" element={<WritingModule />} />
            <Route path="/module/activity" element={<ActivityModule />} />
            <Route path="/module/games" element={<GamesModule />} />
            <Route path="/module/coding" element={<CodingModule />} />
          </Routes>
        </main>
        <footer style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
          <p>&copy; 2026 KidEduQuest. All rights reserved. 🚀</p>
        </footer>
      </Router>
    </AuthProvider>
  );
}

export default App;
