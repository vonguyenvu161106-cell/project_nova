// ============================================
// AI ASSISTANT - CHATBOT LOGIC
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  initAIAssistant();
});

function initAIAssistant() {
  const toggle = document.getElementById("aiToggle");
  const chatWindow = document.getElementById("aiChatWindow");
  const closeBtn = document.getElementById("aiClose");
  const messagesContainer = document.getElementById("aiMessages");
  const inputField = document.getElementById("aiInput");
  const sendBtn = document.getElementById("aiSend");

  // Mở/đóng chat
  toggle.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    toggle.classList.toggle("active");
    if (chatWindow.classList.contains("open")) {
      inputField.focus();
    }
  });

  closeBtn.addEventListener("click", () => {
    chatWindow.classList.remove("open");
    toggle.classList.remove("active");
  });

  // Gửi tin nhắn
  function sendMessage() {
    const userText = inputField.value.trim();
    if (!userText) return;

    // Thêm tin nhắn người dùng
    addMessage(userText, "user");
    inputField.value = "";

    // Hiển thị typing indicator
    showTypingIndicator();

    // Giả lập thời gian trả lời
    setTimeout(
      () => {
        removeTypingIndicator();
        const botResponse = getBotResponse(userText);
        addMessage(botResponse, "bot");
      },
      800 + Math.random() * 500,
    );
  }

  sendBtn.addEventListener("click", sendMessage);
  inputField.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });

  // Thêm tin nhắn
  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("ai-message", sender);
    msgDiv.textContent = text;
    messagesContainer.appendChild(msgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Typing indicator
  function showTypingIndicator() {
    const typingDiv = document.createElement("div");
    typingDiv.classList.add("ai-message", "bot", "typing-indicator");
    typingDiv.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function removeTypingIndicator() {
    const typing = messagesContainer.querySelector(".typing-indicator");
    if (typing) typing.remove();
  }

  // Bộ trả lời AI đơn giản
  function getBotResponse(input) {
    const text = input.toLowerCase();

    // Quy tắc trả lời theo từ khóa
    const rules = [
      {
        keywords: ["chào", "hello", "hi", "hey", "xin chào"],
        response:
          "Xin chào! 👋 Tôi là trợ lý Nova. Tôi có thể giúp gì cho bạn?",
      },
      {
        keywords: ["giá", "bao nhiêu", "chi phí", "báo giá", "phí"],
        response:
          "Giá cả phụ thuộc vào loại dự án. Bạn có thể để lại thông tin ở phần Liên hệ, hoặc nói rõ loại dự án (website, app, thương hiệu...) để tôi tư vấn sơ bộ nhé!",
      },
      {
        keywords: ["dịch vụ", "làm gì", "cung cấp"],
        response:
          "Nova Studio cung cấp: Thiết kế Website, Phát triển Ứng dụng, Nhận diện Thương hiệu, SEO & Marketing, Thương mại điện tử và giải pháp AI.",
      },
      {
        keywords: ["liên hệ", "số điện thoại", "email", "địa chỉ"],
        response:
          "Bạn có thể liên hệ qua:\n📧 Email: hello@novastudio.vn\n📞 Điện thoại: +84 912 345 678\n📍 Địa chỉ: Tầng 12, Landmark 81, TP.HCM",
      },
      {
        keywords: ["thời gian", "bao lâu", "deadline", "hoàn thành"],
        response:
          "Thời gian hoàn thành tùy độ phức tạp: Website thường 2-4 tuần, App 4-8 tuần, Branding 1-3 tuần. Chúng tôi luôn đúng hạn cam kết!",
      },
      {
        keywords: ["kinh nghiệm", "dự án", "portfolio", "đã làm"],
        response:
          'Chúng tôi đã hoàn thành 250+ dự án cho 120+ khách hàng, từ startup đến tập đoàn lớn. Bạn có thể xem mục "Dự Án" trên trang để biết thêm chi tiết.',
      },
      {
        keywords: ["bảo hành", "hỗ trợ", "sau khi"],
        response:
          "Chúng tôi bảo hành 12 tháng và hỗ trợ kỹ thuật trọn đời cho mọi sản phẩm. Đội ngũ luôn sẵn sàng giải đáp.",
      },
    ];

    // Tìm quy tắc phù hợp
    for (const rule of rules) {
      if (rule.keywords.some((kw) => text.includes(kw))) {
        return rule.response;
      }
    }

    // Trả lời mặc định
    return "Cảm ơn câu hỏi của bạn! Bạn có thể hỏi thêm về dịch vụ, giá cả, liên hệ, hoặc thời gian. Nếu cần tư vấn chi tiết, hãy để lại tin nhắn ở mục Liên hệ nhé! 😊";
  }
}
