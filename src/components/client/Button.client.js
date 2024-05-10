"use client"; // This line explicitly marks this file as a Client Component

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}
