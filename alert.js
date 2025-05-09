/**
 * 显示弹窗通知
 * @param {string} message - 消息内容，默认为"操作失败，请重试"
 * @param {string} type - 弹窗类型，可以是"error"或"success"，默认为"error"
 * @returns {HTMLElement} - 返回创建的弹窗元素
 */
function showAlert(message = "操作失败，请重试", type = "error") {
  // 确保消息不为空
  if (!message || message.trim() === "") {
    message = type === "success" ? "操作成功" : "操作失败，请重试"
  }

  // 创建或获取弹窗容器
  let alertContainer = document.getElementById("alertContainer")
  if (!alertContainer) {
    alertContainer = document.createElement("div")
    alertContainer.id = "alertContainer"
    // 设置容器的固定样式
    Object.assign(alertContainer.style, {
      position: "fixed",
      top: "0",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "99999",
      pointerEvents: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      transition: "top 0.3s ease"
    })
    document.body.appendChild(alertContainer)
  }

  // 检查导航栏
  const updateAlertPosition = () => {
    const navbar = document.querySelector('nav')
    if (navbar) {
      const navbarHeight = navbar.offsetHeight
      const navbarVisible = !navbar.classList.contains('nav-hidden') && window.scrollY < navbarHeight
      // 为导航栏添加额外的间距(30px)，与弹窗间距保持一致
      alertContainer.style.top = navbarVisible ? `${navbarHeight + 20}px` : '20px'
    }
  }

  // 初始更新位置
  updateAlertPosition()

  // 监听滚动事件以更新位置
  window.addEventListener('scroll', updateAlertPosition)

  // 创建弹窗元素
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.innerHTML = `
    <div class="content-wrapper">
      <div class="icon-wrapper">
        <div class="icon-background"></div>
        <div class="icon-${type === "success" ? 'checkmark">✓' : 'cross">×'}</div>
      </div>
      <span>${message}</span>
    </div>
  `

  // 设置弹窗的样式
  Object.assign(alert.style, {
    opacity: "0",
    transform: "translateY(-100%)",
    transition: "all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    pointerEvents: "auto",
    position: "relative",
    marginBottom: "10px",
  })

  alertContainer.appendChild(alert)

  // 强制重排
  alert.offsetHeight

  // 显示动画
  requestAnimationFrame(() => {
    alert.style.opacity = "1"
    alert.style.transform = "translateY(0)"
  })

  // 获取动画元素
  const iconBackground = alert.querySelector(".icon-background")
  const iconSymbol = alert.querySelector(".icon-cross, .icon-checkmark")

  // 设置初始动画
  if (type === "error") {
    iconBackground.style.animation = "errorBackgroundIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
    iconSymbol.style.animation = "errorCrossIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
  } else if (type === "success") {
    iconBackground.style.animation = "successBackgroundIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
    iconSymbol.style.animation = "successCheckmarkIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards"
  }

  // 自动关闭定时器
  let timeout = setTimeout(() => closeAlert(), 3000)

  // 关闭弹窗的函数
  function closeAlert() {
    // 图标收回动画
    if (type === "error") {
      iconBackground.style.animation = "errorBackgroundOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
      iconSymbol.style.animation = "errorCrossOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
    } else if (type === "success") {
      iconBackground.style.animation = "successBackgroundOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
      iconSymbol.style.animation = "successCheckmarkOut 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards"
    }

    setTimeout(() => {
      alert.style.opacity = "0"
      alert.style.transform = "translateX(100%)"

      setTimeout(() => {
        if (alert.parentNode === alertContainer) {
          alertContainer.removeChild(alert)
        }
        // 如果容器为空，移除容器
        if (alertContainer.children.length === 0) {
          document.body.removeChild(alertContainer)
        }
      }, 400)
    }, 200)
  }

  // 鼠标悬停暂停关闭 - 无论鼠标在弹窗的哪个部分，都会暂停关闭
  alert.addEventListener("mouseenter", () => {
    clearTimeout(timeout)
    alert.style.transform = "scale(1.02)"
  })

  // 鼠标离开恢复关闭倒计时
  alert.addEventListener("mouseleave", () => {
    alert.style.transform = "scale(1)"
    timeout = setTimeout(() => closeAlert(), 2000)
  })

  return alert
}

// 如果在模块环境中，导出函数
if (typeof module !== "undefined" && module.exports) {
  module.exports = { showAlert }
} else {
  // 在浏览器环境中，添加到全局对象
  window.showAlert = showAlert
}

// 在控制台显示主题信息
console.log(
  '%c Theme: Popup Component %c By Xiaoy %c Version 1.0.0 ',
  'background: linear-gradient(90deg, #06b6d4, #0891b2); color: white; border-radius: 3px 0 0 3px; padding: 2px;',
  'background: linear-gradient(90deg, #0891b2, #0e7490); color: white; padding: 2px;',
  'background: linear-gradient(90deg, #0e7490, #155e75); color: white; border-radius: 0 3px 3px 0; padding: 2px;'
);

// 显示项目链接
console.log(
  '%c https://github.com/xiaoy-awa/popup-component ',
  'color: #06b6d4; text-decoration: underline;'
);
