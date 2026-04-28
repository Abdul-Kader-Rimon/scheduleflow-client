import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{background: 'linear-gradient(135deg, #f0fdf8 0%, #d1fae5 100%)'}}>
      <div className="text-center max-w-md">
        
        <div className="font-bold select-none" style={{fontSize: '9rem', color: '#a7f3d0', lineHeight: 1}}>
          404
        </div>
        
        <h1 className="text-2xl font-bold mt-4 mb-2" style={{color: '#065f46'}}>
          Page Not Found
        </h1>
        <p className="mb-8" style={{color: '#6b7280'}}>
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 rounded-lg font-medium transition"
            style={{border: '1.5px solid #2FA084', color: '#2FA084', background: 'transparent'}}
            onMouseEnter={e => e.target.style.background = '#f0fdf8'}
            onMouseLeave={e => e.target.style.background = 'transparent'}
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate('/home')}
            className="px-6 py-2.5 rounded-lg font-medium transition"
            style={{background: '#2FA084', color: 'white', border: '1.5px solid #2FA084'}}
            onMouseEnter={e => e.target.style.background = '#27876f'}
            onMouseLeave={e => e.target.style.background = '#2FA084'}
          >
            Go to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default NotFound;