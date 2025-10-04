import { Sparkles } from 'lucide-react';
export default function Header(){
    return(
        <div className="header">
          <h1 className="header-title">
            todo list
            <Sparkles style={{ width: '32px', height: '32px', color: '#667eea' }} />
          </h1>
        </div>
    );
}