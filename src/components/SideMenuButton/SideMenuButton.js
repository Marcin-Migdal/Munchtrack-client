import React from 'react'

export default function SideMenuButton({ icon, text, classes, onClick }) {
  const styles = classes();

  return (
    <div className={styles.sideMenuItem} onClick={onClick}>
      {icon}
      <span className={styles.sideMenuItemText}>
        {text}
      </span>
    </div>
  )
}
