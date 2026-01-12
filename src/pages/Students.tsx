import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header';
import { useAuth } from '../contexts/AuthContext';
import { getAllUsers, type StudentInfo } from '../services/admin';
import './Students.css';

export default function Students() {
  const navigate = useNavigate();
  const { isLoggedIn, isAdmin } = useAuth();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<StudentInfo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!isAdmin) {
      alert('관리자만 접근할 수 있는 페이지입니다.');
      navigate('/');
      return;
    }

    loadStudents();
  }, [isLoggedIn, isAdmin, navigate]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredStudents(students);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = students.filter(student => 
        student.name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query) ||
        student.userId.toString().includes(query)
      );
      setFilteredStudents(filtered);
    }
  }, [searchQuery, students]);

  const loadStudents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      setStudents(data);
      setFilteredStudents(data);
    } catch (err: any) {
      setError(err.message || '학생 정보를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    // 검색은 useEffect에서 자동으로 처리됨
  };

  if (!isLoggedIn || !isAdmin) {
    return null;
  }

  return (
    <div className="students-container">
      <Header />
      <div className="students-content">
        <div className="students-header">
          <h1 className="students-title">학생 정보</h1>
        </div>

        <div className="search-section">
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="검색 입력하기"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
        </div>

        {isLoading ? (
          <div className="loading">불러오는 중...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : (
          <div className="table-container">
            <table className="students-table">
              <thead>
                <tr>
                  <th>순번</th>
                  <th>학번</th>
                  <th>이름</th>
                  <th>이메일</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="empty-cell">
                      {searchQuery ? '검색 결과가 없습니다.' : '학생 정보가 없습니다.'}
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student, index) => (
                    <tr key={student.userId}>
                      <td>{index + 1}</td>
                      <td>{student.userId}</td>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
