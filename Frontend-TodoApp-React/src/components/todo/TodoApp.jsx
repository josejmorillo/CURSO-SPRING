import { useState } from 'react'
import './TodoApp.css'
import LogoutComponent from './LogoutComponent';
import HeaderComponent from './HeaderComponent';
import ListTodosComponent from './ListTodoComponent';
import ErrorComponent from './ErrorComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import AuthProvider, { useAuth } from './security/AuthContext';
import TodoComponent from './TodoComponent';


function AuthenticatedRoute ({children}) {
    const auth = useAuth()
    if(auth.isAuthenticated)
        return children

    return <Navigate to='/' />
}

export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='/' element={<LoginComponent/>} />
                        <Route path='/login' element={<LoginComponent/>} />
                        
                        <Route path='/welcome/:username' element={
                            <AuthenticatedRoute>
                                <WelcomeComponent/>
                            </AuthenticatedRoute>
                        } />                        

                        <Route path='/todos' element={
                            <AuthenticatedRoute>
                                <ListTodosComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path='/logout' element={
                            <AuthenticatedRoute>
                                <LogoutComponent/>
                            </AuthenticatedRoute>
                        } />
                        <Route path='/todo/:id' element={<TodoComponent />} /> 
                        <Route path='*' element={<ErrorComponent/>} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}








