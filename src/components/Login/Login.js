import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthedUser } from "../../actions/authedUser";
import UserSelect from "../UserSelect";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [selectedUser, setSelectedUser] = useState("");
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const PALETTE = ["#6366f1", "#818cf8", "#8b5cf6", "#a78bfa", "#60a5fa", "#7c3aed"];

    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(150, 140, 255, ${0.15 * (1 - d / 130)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        if (mx !== null) {
          const d = Math.hypot(p.x - mx, p.y - my);
          if (d < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(200, 185, 255, ${0.28 * (1 - d / 150)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = p.r * 6;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => resize();
    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: null, y: null }; };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleLogin = () => {
    if (selectedUser) {
      dispatch(setAuthedUser(selectedUser));
      const path = localStorage.getItem("lastVisitedPath") || "/dashboard";
      navigate(path);
      localStorage.removeItem("lastVisitedPath");
    } else {
      alert("Please, select a user.");
    }
  };

  return (
    <>
      <canvas ref={canvasRef} className="particles-canvas" />
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-logo">WYR</div>
          <h1 className="login-title">Would You Rather?</h1>
          <p className="login-subtitle">Choose your profile to get started</p>
          <div className="login-divider" />
          <UserSelect users={users} onSelect={setSelectedUser} />
          <button className="login-btn" onClick={handleLogin}>
            Sign In
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
