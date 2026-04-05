/* showcase.js — mirrors script.js patterns from CodewithMJ CV */
(function ($) {
  "use strict";

  function revealOnScroll() {
    var triggerBottom = window.innerHeight * 0.9;
    $(".reveal").each(function () {
      var elementTop = this.getBoundingClientRect().top;
      if (elementTop < triggerBottom) {
        $(this).addClass("visible");
      }
    });
  }

  function animateMetrics() {
    $(".metric-num").each(function () {
      var $num = $(this);
      var target = parseFloat($num.data("target"));
      var hasDecimal = String(target).indexOf(".") >= 0;

      $({ val: 0 }).animate(
        { val: target },
        {
          duration: 1400,
          easing: "swing",
          step: function () {
            $num.text(hasDecimal ? this.val.toFixed(2) : Math.floor(this.val));
          },
          complete: function () {
            $num.text(hasDecimal ? target.toFixed(2) : target);
          }
        }
      );
    });
  }

  function initBackgroundAnimation() {
    var canvas = document.getElementById("bg-canvas");
    if (!canvas) { return; }
    var ctx = canvas.getContext("2d");
    if (!ctx) { return; }

    var particles = [];
    var mouse = { x: -1000, y: -1000 };
    var particleCount = 56;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i += 1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          r: 1 + Math.random() * 2.6
        });
      }
    }

    function drawConnections() {
      for (var a = 0; a < particles.length; a += 1) {
        for (var b = a + 1; b < particles.length; b += 1) {
          var dx = particles[a].x - particles[b].x;
          var dy = particles[a].y - particles[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            var alpha = 0.2 - dist / 600;
            ctx.strokeStyle = "rgba(149, 187, 213, " + alpha + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i += 1) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10 || p.x > canvas.width + 10) { p.vx *= -1; }
        if (p.y < -10 || p.y > canvas.height + 10) { p.vy *= -1; }
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 120) {
          p.x += mdx / 32;
          p.y += mdy / 32;
        }
        ctx.fillStyle = "rgba(61, 214, 198, 0.75)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      drawConnections();
      window.requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener("resize", function () {
      resizeCanvas();
      createParticles();
    });

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("mouseleave", function () {
      mouse.x = -1000;
      mouse.y = -1000;
    });
  }

  $(function () {
    revealOnScroll();
    animateMetrics();
    initBackgroundAnimation();
    $(window).on("scroll resize", revealOnScroll);
  });

})(jQuery);