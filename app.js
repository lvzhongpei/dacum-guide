/* ===== 全局：导航 / 滚动 / 回到顶部 / reveal 动画 ===== */
(function(){
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  menuBtn.addEventListener('click', () => navLinks.classList.toggle('open'));

  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // reveal 动画
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  // 兜底：1.5s 后剩余未可见元素强制可见（防止 IO 异常或无滚动场景）
  setTimeout(() => {
    document.querySelectorAll('.reveal:not(.in)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 200 && r.bottom > -200) el.classList.add('in');
    });
  }, 600);
})();

/* ===== 第2章：三大前提切换 ===== */
(function(){
  const tabs = document.querySelectorAll('.premise-tab');
  const cards = document.querySelectorAll('.premise-card');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      cards.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      const i = tab.dataset.p;
      document.querySelector(`.premise-card[data-panel="${i}"]`).classList.add('active');
    });
  });
})();

/* ===== 第4章：八步流程详情 ===== */
(function(){
  const steps = [
    { name:'引导委员会（Orientation）', desc:'开场介绍成员，讲解 DACUM 的目的、三大前提和八步流程，明确"引导者是过程专家、成员是内容专家"。', example:'主持人自我介绍、破冰，说明"今天我们一起把你这个岗位要会什么列成一张表"。' },
    { name:'审视职业（Review）', desc:'确定要分析的确切职业名称与范围，明确哪些岗位包含在内、哪些排除，形成"工作定义"。', example:'比如"会计"岗位，要明确是否包含出纳、总账、纳税核算等，还是只做往来核算。' },
    { name:'界定职责领域（Duties）', desc:'用头脑风暴列出该职业的"职责"——宽泛的责任领域，通常 8–12 个，用动词开头。', example:'会计的职责：出纳核算、往来核算、成本核算、纳税核算……' },
    { name:'界定具体任务（Tasks）', desc:'在每个职责下，列出具体任务，每条以行为动词开头。这是最耗时的一步，通常 50–200 条。', example:'出纳核算下的任务：登记现金日记账、编制记账凭证、核对银行对账单……' },
    { name:'审核精炼陈述（Refine）', desc:'逐条检查、修改、增删任务与职责陈述，使其清晰、准确、符合写作标准。', example:'把"了解设备原理"改成"检修设备故障"，把啰嗦的表达精简。' },
    { name:'排序（Sequence）', desc:'把每个职责内的任务按"建议教学顺序"排列，再把职责按重要性从上到下排。', example:'先教"登记日记账"再教"结账"；把最核心的职责排在最上面。' },
    { name:'界定入门任务（Entry-Level）', desc:'标记哪些任务是"新员工就要会"的入门级任务，哪些是高级任务。', example:'用彩色笔标记高级任务（如 A），入门任务留给验证阶段再确认。' },
    { name:'其他选项（Options）', desc:'如时间允许，可：修订职业定义、建立职业阶梯、给任务打分（重要性/难度/频率）。', example:'给每条任务评"重要性 1–5 分"，供后续课程开发排序用。' }
  ];
  const flowSteps = document.querySelectorAll('.flow-step');
  const detail = document.getElementById('flowDetail');
  function render(i){
    const s = steps[i];
    detail.innerHTML = `<h4>第 ${i+1} 步：${s.name}</h4><p>${s.desc}</p><div class="tip">💡 例子：${s.example}</div>`;
    flowSteps.forEach((fs, idx) => fs.classList.toggle('active', idx === i));
  }
  flowSteps.forEach((fs, idx) => fs.addEventListener('click', () => render(idx)));
  render(0);
})();

/* ===== 工具1：八步引导器 ===== */
(function(){
  const data = [
    { t:'第 1 步 · 引导委员会', d:'向成员讲解 DACUM 的目的、前提和流程，建立参与氛围。这是主持人正在做的第一步。', e:'破冰 + 讲解"三大前提" + 明确角色分工' },
    { t:'第 2 步 · 审视职业', d:'确定职业名称与范围，写出"工作定义"。', e:'例：会计（含出纳、往来、成本、纳税核算）' },
    { t:'第 3 步 · 界定职责', d:'头脑风暴列出 8–12 个职责（宽泛责任领域）。', e:'出纳核算 / 往来核算 / 成本核算…' },
    { t:'第 4 步 · 界定任务', d:'每个职责下列出具体任务，动词开头。', e:'登记现金日记账 / 编制记账凭证…' },
    { t:'第 5 步 · 审核精炼', d:'逐条修改增删，让陈述清晰准确。', e:'"了解原理"→"检修故障"' },
    { t:'第 6 步 · 排序', d:'任务按教学顺序排，职责按重要性排。', e:'先简单后复杂，核心职责在上' },
    { t:'第 7 步 · 界定入门任务', d:'标记哪些是新员工必会的入门任务。', e:'用彩色标记"高级任务"' },
    { t:'第 8 步 · 其他选项', d:'可修订定义、建职业阶梯、给任务打分。', e:'重要性/难度/频率打分' }
  ];
  let cur = 0;
  const stage = document.getElementById('wizStage');
  const bar = document.getElementById('wizBar');
  const prev = document.getElementById('wizPrev');
  const next = document.getElementById('wizNext');
  function render(){
    const d = data[cur];
    stage.innerHTML = `<h4>${d.t}</h4><p>${d.d}</p><div class="wiz-example">💡 ${d.e}</div>`;
    bar.style.width = ((cur+1)/data.length*100) + '%';
    prev.disabled = cur === 0;
    next.textContent = cur === data.length-1 ? '完成' : '下一步';
  }
  prev.addEventListener('click', () => { if(cur>0){cur--;render();} });
  next.addEventListener('click', () => { if(cur<data.length-1){cur++;render();} else { stage.innerHTML = '<h4>🎉 八步走完！</h4><p>恭喜，你已经体验了一次完整的 DACUM 工作坊流程。现在可以去"卡片墙搭建器"动手搭一张真实的能力图。</p>'; next.textContent='重新开始'; next.onclick=()=>{cur=0;render();}; } });
  render();
})();

/* ===== 工具2：卡片墙搭建器 ===== */
(function(){
  let wall = JSON.parse(localStorage.getItem('dacum-wall') || '[]');
  const wallEl = document.getElementById('wall');
  const input = document.getElementById('wallInput');
  const type = document.getElementById('wallType');
  const addBtn = document.getElementById('wallAdd');

  function save(){ localStorage.setItem('dacum-wall', JSON.stringify(wall)); }
  function render(){
    if(wall.length === 0){ wallEl.innerHTML = '<p class="empty-tip">还没有内容。先在上方输入一条"职责"，点添加，开始搭建你的能力图。</p>'; return; }
    wallEl.innerHTML = '';
    wall.forEach((d, di) => {
      const block = document.createElement('div');
      block.className = 'duty-block';
      block.dataset.duty = di;
      block.innerHTML = `
        <div class="duty-head">
          <span class="duty-title">${escapeHtml(d.duty)}</span>
          <button class="del-btn" data-del-duty="${di}">删除职责</button>
        </div>
        <div class="duty-tasks" data-tasks="${di}"></div>`;
      wallEl.appendChild(block);
      const tasksEl = block.querySelector('.duty-tasks');
      (d.tasks || []).forEach((t, ti) => {
        const chip = document.createElement('span');
        chip.className = 'task-chip';
        chip.innerHTML = `${escapeHtml(t)} <span class="x" data-del-task="${di}" data-ti="${ti}">✕</span>`;
        tasksEl.appendChild(chip);
      });
      if((d.tasks||[]).length === 0) tasksEl.innerHTML = '<span class="empty-tip" style="font-size:13px">（暂无任务，选中"作为任务添加"并输入）</span>';
    });
    bindDel();
  }
  function bindDel(){
    document.querySelectorAll('[data-del-duty]').forEach(b => b.addEventListener('click', () => { wall.splice(+b.dataset.delDuty,1); save(); render(); }));
    document.querySelectorAll('[data-del-task]').forEach(x => x.addEventListener('click', () => { wall[+x.dataset.delTask]?.tasks?.splice(+x.dataset.ti,1); save(); render(); }));
  }
  addBtn.addEventListener('click', () => {
    const v = input.value.trim();
    if(!v){ alert('请输入内容'); return; }
    if(type.value === 'duty'){
      wall.push({duty:v, tasks:[]});
    } else {
      const activeDuty = document.querySelector('.duty-block');
      if(!activeDuty){ alert('请先添加一个职责'); return; }
      const di = +activeDuty.dataset.duty;
      wall[di].tasks = wall[di].tasks || [];
      wall[di].tasks.push(v);
    }
    input.value = ''; save(); render();
  });
  render();
})();

/* ===== 工具3：任务陈述检查器 ===== */
(function(){
  const badVerbs = ['知道','了解','理解','掌握','熟悉','欣赏','领会','负责','打交道','处理','参与','具有','具备','认识','学习'];
  const vague = ['进行','做','弄','搞','实施','操作','管理','协调'];
  const filler = ['有效地','认真地','仔细地','适当地','正确地','及时地'];
  const btn = document.getElementById('checkBtn');
  const input = document.getElementById('checkInput');
  const out = document.getElementById('checkResult');
  btn.addEventListener('click', check);
  input.addEventListener('keydown', e => { if(e.key==='Enter') check(); });
  function check(){
    const s = input.value.trim();
    out.innerHTML = '';
    if(!s){ out.innerHTML = '<p class="empty-tip">请先输入一条任务陈述。</p>'; return; }
    const items = [];
    const add = (cls, txt) => items.push(`<div class="cr-item ${cls}">${txt}</div>`);

    // 1 动词开头
    const firstVerbBad = badVerbs.some(v => s.startsWith(v));
    if(firstVerbBad){ add('cr-bad', '✗ 以"知道/了解/负责"等认知词开头 —— 应改成具体行为动词'); }
    else { add('cr-ok', '✓ 未以认知词开头'); }

    // 2 模糊动词
    const hasVague = vague.some(v => s.startsWith(v));
    if(hasVague){ add('cr-warn', '⚠ 以"进行/做/搞"等模糊动词开头，建议更具体（如"检修、编制、记录"）'); }

    // 3 长度
    if(s.length < 4){ add('cr-bad', '✗ 过短，不像完整任务'); }
    else if(s.length > 30){ add('cr-warn', '⚠ 偏长（'+s.length+'字），一个陈述最好只含一个任务'); }

    // 4 废话词
    const hasFiller = filler.some(f => s.includes(f));
    if(hasFiller){ add('cr-warn', '⚠ 含"有效地/认真地"等冗余修饰，可删除'); }

    // 5 多任务（逗号/和/并）
    if(/[，、和并及]/.test(s)){ add('cr-warn', '⚠ 可能包含多个任务，一个陈述应只写一个任务'); }

    // 6 是否有动词
    if(!firstVerbBad && !hasVague && s.length >= 4){
      add('cr-ok', '✓ 结构基本符合「动词开头」的要求');
    }

    if(items.every(i => i.includes('cr-ok') || i.includes('cr-warn'))){
      add('cr-ok', '🎉 总体合格！可进一步检查是否含「动词+宾语+限定语」三要素');
    }
    out.innerHTML = items.join('');
  }
})();

/* ===== 工具4：职责/任务分类练习 ===== */
(function(){
  const data = [
    { q:'维护焊接设备', a:'duty', why:'这是一个宽泛的责任领域，下面还能拆出很多具体任务（更换焊条、调电流等）。' },
    { q:'更换损坏的轴承', a:'task', why:'具体、可观察、短时间完成，是任务。' },
    { q:'执行诊断测试', a:'duty', why:'宽泛领域，下面包含"用万用表测电压""读取故障码"等任务。' },
    { q:'编制月度财务报表', a:'task', why:'具体产出物（报表），是任务。' },
    { q:'提供客户服务', a:'duty', why:'宽泛责任领域，含"接听电话""处理投诉"等多个任务。' },
    { q:'登记现金日记账', a:'task', why:'明确、单一、可观察的动作，是任务。' },
    { q:'管理薪酬体系', a:'duty', why:'宽泛领域，含"制定薪酬政策""核算工资"等任务。' },
    { q:'使用万用表测量电路电压', a:'task', why:'具体、限时、有产出，是任务。' }
  ];
  const quiz = document.getElementById('quiz');
  quiz.innerHTML = '';
  data.forEach((item, i) => {
    const div = document.createElement('div');
    div.className = 'quiz-item';
    div.innerHTML = `
      <div class="quiz-q">${i+1}. 「${item.q}」是——</div>
      <div class="quiz-actions">
        <button data-a="duty">职责（宽泛领域）</button>
        <button data-a="task">任务（具体活动）</button>
      </div>
      <div class="quiz-feedback"></div>`;
    quiz.appendChild(div);
    const btns = div.querySelectorAll('button');
    const fb = div.querySelector('.quiz-feedback');
    btns.forEach(b => b.addEventListener('click', () => {
      const pick = b.dataset.a;
      btns.forEach(x => x.classList.remove('picked-true','picked-false'));
      if(pick === item.a){
        b.classList.add('picked-true');
        fb.textContent = '✓ 正确！' + item.why;
        fb.style.color = 'var(--green)';
      } else {
        b.classList.add('picked-false');
        btns.forEach(x => { if(x.dataset.a===item.a) x.classList.add('picked-true'); });
        fb.textContent = '✗ 答案是「'+ (item.a==='duty'?'职责':'任务') +'」。' + item.why;
        fb.style.color = 'var(--red)';
      }
      fb.style.display = 'block';
    }));
  });
})();

/* ===== 工具5：验证问卷生成器 ===== */
(function(){
  const dims = [
    {id:'imp', label:'重要性'},
    {id:'freq', label:'频率'},
    {id:'entry', label:'是否入门级'},
    {id:'diff', label:'难度'},
    {id:'crit', label:'关键性'}
  ];
  const opts = document.getElementById('surveyOpts');
  dims.forEach((d, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" data-dim="${d.id}" ${i<3?'checked':''}> ${d.label}`;
    opts.appendChild(label);
  });
  document.getElementById('surveyGen').addEventListener('click', () => {
    const tasks = document.getElementById('surveyInput').value.split('\n').map(s=>s.trim()).filter(Boolean);
    const out = document.getElementById('surveyOut');
    if(tasks.length === 0){ out.innerHTML = '<p class="empty-tip">请先在上方输入任务清单（每行一条）。</p>'; return; }
    const checked = [...opts.querySelectorAll('input:checked')].map(c => c.dataset.dim);
    const dimLabel = {imp:'重要性',freq:'频率',entry:'入门级',diff:'难度',crit:'关键性'};
    let html = `<p style="margin-bottom:10px"><b>DACUM 任务验证问卷</b>（共 ${tasks.length} 项任务，评估维度：${checked.map(c=>dimLabel[c]).join('、')}）</p>`;
    html += '<table class="survey-table"><thead><tr><th>任务</th>';
    checked.forEach(c => html += `<th>${dimLabel[c]}</th>`);
    html += '<th>补充建议</th></tr></thead><tbody>';
    tasks.forEach(t => {
      html += `<tr><td>${escapeHtml(t)}</td>`;
      checked.forEach(c => html += `<td>___</td>`);
      html += `<td>___</td></tr>`;
    });
    html += '</tbody></table>';
    html += '<p style="font-size:13px;color:var(--muted);margin-top:10px">评分建议：重要性/频率/难度/关键性按 1–5 分，入门级填"是/否"。可在表格中直接填写后打印。</p>';
    out.innerHTML = html;
  });
})();

/* ===== 工具6：图表导出器 ===== */
(function(){
  document.getElementById('chartBuild').addEventListener('click', () => {
    const wall = JSON.parse(localStorage.getItem('dacum-wall') || '[]');
    const out = document.getElementById('chartOut');
    if(wall.length === 0){ out.innerHTML = '<p class="empty-tip">卡片墙还是空的。请先去"卡片墙搭建器"添加职责和任务。</p>'; return; }
    let html = '<div class="chart-export">';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    wall.forEach((d, di) => {
      html += `<div class="ce-duty">${letters[di]} · ${escapeHtml(d.duty)}</div>`;
      html += '<div class="ce-tasks">';
      (d.tasks||[]).forEach((t, ti) => {
        html += `<span>${letters[di]}-${ti+1} ${escapeHtml(t)}</span>`;
      });
      html += '</div>';
    });
    html += '</div>';
    out.innerHTML = html;
  });
  document.getElementById('chartJson').addEventListener('click', () => {
    const wall = JSON.parse(localStorage.getItem('dacum-wall') || '[]');
    if(wall.length === 0){ alert('卡片墙还是空的'); return; }
    download('dacum-chart.json', JSON.stringify(wall, null, 2));
  });
  document.getElementById('chartPng').addEventListener('click', () => {
    const el = document.querySelector('.chart-export');
    if(!el){ alert('请先点击"从卡片墙生成图表"'); return; }
    const node = document.getElementById('chartOut');
    htmlToImage(node);
  });
})();

/* ===== 工具函数 ===== */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function download(name, content){
  const blob = new Blob([content], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}
function htmlToImage(node){
  // 用 SVG foreignObject 手动渲染导出（无需外部库）
  const clone = node.cloneNode(true);
  const w = node.offsetWidth || 800;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${node.offsetHeight||600}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml">${clone.outerHTML}</div></foreignObject></svg>`;
  const img = new Image();
  const svgBlob = new Blob([svg], {type:'image/svg+xml;charset=utf-8'});
  const url = URL.createObjectURL(svgBlob);
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = w; canvas.height = node.offsetHeight || 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img, 0, 0);
    URL.revokeObjectURL(url);
    const a = document.createElement('a');
    a.href = canvas.toDataURL('image/png');
    a.download = 'dacum-chart.png';
    a.click();
  };
  img.onerror = () => { alert('导出图片失败，请改用"导出 JSON"'); URL.revokeObjectURL(url); };
  img.src = url;
}

/* ===== 工具 tab 切换 ===== */
(function(){
  const tabs = document.querySelectorAll('.tool-tab');
  const panels = document.querySelectorAll('.tool-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.t).classList.add('active');
    });
  });
})();
