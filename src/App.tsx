import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Signup } from './pages/auth';
import { PublicBoard } from './pages/board';
import { ChatDetail } from './pages/chat';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import MyChat from './pages/chat/MyChat';
import AdminChat from './pages/admin/AdminChat';
import AdminChatList from './pages/chat/AdminChatList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/boards/public" element={<PublicBoard />} />
        <Route path="/chats/:chatRoomId" element={<ChatDetail />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/my-chat" element={<MyChat />} />
        <Route path="/admin-chat" element={<AdminChat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin-chatList" element={<AdminChatList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;