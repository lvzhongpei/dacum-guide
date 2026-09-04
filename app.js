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

/* ===== 第7章：不同岗位的实际分析 ===== */
(function(){
  const cases = [
    {
      id: 'hr-manager',
      icon: '👥',
      title: '人力资源经理',
      subtitle: 'HR Manager',
      tag: '中国权威标准能力图表',
      source: '来源：MBA 智库百科《DACUM 分析法》· 人力资源开发经理能力图表',
      summary: '人力资源开发经理的经典 DACUM 能力图表，把 HR 岗位拆成 8 大职责（能力领域），每项职责下再列具体任务。这是国内人力资源管理领域流传最广的 DACUM 范例，覆盖招聘、薪酬、绩效、员工关系、组织发展等 HR 全模块。',
      stats: [
        { n: '8', l: '职责（能力领域）' },
        { n: '60+', l: '具体任务' },
        { n: '全模块', l: 'HR 覆盖' }
      ],
      duties: [
        { name: '提供人力资源支持', desc: '招聘、人力规划、预算与职级制度', tasks: [
          ['', '制定招聘政策和程序', '规范招聘流程与标准'],
          ['', '分析人力需求、制定人力资源计划', '基于业务预测人力缺口'],
          ['', '运用面试和选择技巧', '筛选并选拔合适人才'],
          ['', '控制人员预算、制定职级制度', '管理编制与职级体系']
        ]},
        { name: '管理薪酬', desc: '薪酬政策、体系与预算', tasks: [
          ['', '制定薪酬政策、建立薪酬系统', '搭建薪酬框架'],
          ['', '保证薪酬体系正常运转', '维护日常薪酬运行'],
          ['', '编制新预算、分析薪酬调查结果', '对标市场、控制成本']
        ]},
        { name: '开发人力资源', desc: '培训体系、人才梯队与继任计划', tasks: [
          ['', '制定人力资源发展战略', '对齐组织战略'],
          ['', '建立培训体系、审定培训计划', '保障人才培养落地'],
          ['', '确定关键岗位、制定继任计划', '识别高潜、储备继任者'],
          ['', '建立并维护 HR 信息系统', '数字化管理人才数据']
        ]},
        { name: '管理绩效评估系统', desc: '绩效方案、评估运作与结果应用', tasks: [
          ['', '制定绩效实施方案', '设计考核流程'],
          ['', '指导评估运作、协调结果用途', '推动考核落地'],
          ['', '应用评估结果', '联动晋升、激励与培训']
        ]},
        { name: '改善员工关系', desc: '沟通、满意度与冲突处理', tasks: [
          ['', '建立员工沟通渠道', '搭建上下沟通桥梁'],
          ['', '设计并分析员工满意度调查', '洞察员工心态'],
          ['', '预防并处理企业内部冲突', '化解矛盾、稳定团队']
        ]},
        { name: '促进组织发展', desc: '组织诊断、重组与流程改进', tasks: [
          ['', '制定组织计划、诊断组织', '评估组织健康度'],
          ['', '协助战略重组、支持业务过程改进', '推动组织变革落地']
        ]},
        { name: '提供后勤保障', desc: '行政后勤、安全消防与劳保政策', tasks: [
          ['', '制定行政和后勤保障政策', '规范行政支持'],
          ['', '建立安全消防保卫体系', '保障职场安全'],
          ['', '制定劳保政策', '维护员工权益']
        ]},
        { name: '体现个人能力', desc: '通用职业素养与自我管理', tasks: [
          ['', '进行时间管理、谈判与决策', '高效处理多项事务'],
          ['', '承受压力、综合与创造', '应对复杂场景'],
          ['', '授权与组织、自学', '赋能团队并持续成长']
        ]}
      ],
      highlight: 'HR 经理案例展示了 DACUM 在「白领 / 管理岗位」上的应用——它不只是给技术工种用的，管理岗位同样能拆成清晰的「职责 → 任务」两层结构，且每个职责都紧贴 HR 六大模块。'
    },
    {
      id: 'regional-sales-manager',
      icon: '📈',
      title: '大区销售经理',
      subtitle: 'Regional Sales Manager',
      tag: '安迪曼咨询企业真实案例',
      source: '来源：安迪曼咨询（OnDemand Consulting）DACUM 工作坊 · 大区经理分析表',
      summary: '医疗器械行业「大区经理」的真实 DACUM 分析成果，把销售管理岗位拆成市场分析、团队建设、客户维护、客户开发、项目开发等职责，并为每项任务标注「频繁度 / 重要性 / 优先级 / 难度」四维评分，同时配套知识与技能图谱。这是国内企业培训领域最完整的 DACUM 落地范例。',
      stats: [
        { n: '5+', l: '核心职责' },
        { n: '4 维', l: '评分体系' },
        { n: 'K+S', l: '知识技能图谱' }
      ],
      duties: [
        { name: '分析并了解市场情况', desc: '区域人口、客户、竞争对手与本司现状', tasks: [
          ['', '了解区域基本情况', '人口、经济、医院、行业总量、政策'],
          ['', '了解客户情况', '医院用产品情况、需求、代理情况'],
          ['', '了解竞争对手现状', '代理、占有率、产品、政策、人员'],
          ['', '了解本公司在区域现状', '代理、医院、占有率、区域分布']
        ]},
        { name: '计划和分解区域年度目标', desc: '基于历史数据与公司战略制定目标', tasks: [
          ['', '分析行业增长与区域潜力', '增长率、区域市场容量'],
          ['', '参考公司历史数据与战略目标', '任务目标、增长路径']
        ]},
        { name: '建设大区销售团队', desc: '人员编制、培养与激励', tasks: [
          ['', '确定人员编制', '配置销售团队规模'],
          ['', '制定人员培养计划', '能力提升、辅导带教'],
          ['', '设计员工激励与晋升机制', '调动积极性、稳定骨干']
        ]},
        { name: '维护区域内大客户关系', desc: '重点客户的持续经营', tasks: [
          ['', '维护区域内大客户', '定期拜访、建立信任'],
          ['', '经营经销合作关系', '协同经销商、扩大覆盖']
        ]},
        { name: '开发重点客户与项目', desc: '大客户、进口仪器、流水线、检验所', tasks: [
          ['', '开发重点大客户', '界定标准、制定开发计划'],
          ['', '开发进口仪器项目', '跟踪招标、制定合作方案'],
          ['', '开发流水线与检验所项目', '了解需求、参与合作、跟进落地']
        ]}
      ],
      highlight: '大区销售经理案例是「评分维度最全」的范例：每个任务都标了频繁度 / 重要性 / 优先级 / 难度四维分数，并配套知识（K）与技能（S）图谱，直接可转化为培训课程与考核标准。'
    },
    {
      id: 'sales-consultant',
      icon: '🤝',
      title: '销售顾问',
      subtitle: 'Sales Consultant',
      tag: '八大行业通用职责',
      source: '来源：百度百科「销售顾问」· 汇总八大行业岗位职责',
      summary: '销售顾问（以客户需求为核心提供专业咨询与解决方案的岗位）在零售、汽车、房地产、IT、培训等行业普遍存在。跨行业汇总后，核心职责高度收敛，都围绕「客户开发 → 需求挖掘 → 方案推荐 → 商务谈判 → 售后维系」这条主线，是 DACUM 在「销售类岗位」上的通用范例。',
      stats: [
        { n: '6', l: '核心职责' },
        { n: '8 大', l: '覆盖行业' },
        { n: '顾问式', l: '销售模式' }
      ],
      duties: [
        { name: '客户开发与挖掘', desc: '寻找潜在客户、深挖需求', tasks: [
          ['', '寻找并接触潜在用户', '线上获客、线下接待'],
          ['', '识别客户需求', '分析痛点、判断意向'],
          ['', '挖掘潜在需求、转化为成交用户', '引导需求、促成转化']
        ]},
        { name: '产品介绍与方案推荐', desc: '以客户需求为核心提供方案', tasks: [
          ['', '介绍产品配置与优点', '针对性讲解卖点'],
          ['', '推荐符合客户需求的产品 / 方案', '提供顾问式建议'],
          ['', '演示产品价值', '试乘试驾、demo 演示']
        ]},
        { name: '销售谈判与成交', desc: '报价、谈判、签约', tasks: [
          ['', '提供报价与购车 / 购货方案', '制定多种方案'],
          ['', '进行商务谈判', '价格、条款博弈'],
          ['', '促成成交、签订合同', '完成销售指标']
        ]},
        { name: '客户维系与售后', desc: '回访、转介绍、复购', tasks: [
          ['', '定期回访用户', '保持联系、深挖需求'],
          ['', '跟进售后、解决问题', '提升客户满意度'],
          ['', '促进转介绍与再次购买', '经营长期客户关系']
        ]},
        { name: '市场信息收集', desc: '竞品、市场动态分析', tasks: [
          ['', '收集市场与竞品信息', '了解行业动态'],
          ['', '分析市场变化、调整策略', '把握市场机会']
        ]}
      ],
      highlight: '销售顾问案例证明了 DACUM 的「跨行业收敛性」——不同行业的销售岗位，拆出的核心职责高度一致，说明「职责 → 任务」分析法能快速抽象出岗位的本质能力模型。'
    },
    {
      id: 'customer-service',
      icon: '💬',
      title: '客户服务专员',
      subtitle: 'Customer Service Representative',
      tag: '通用职能岗位范例',
      source: '来源：BetterUp 等职业分析资料 · 客户服务岗位职责',
      summary: '客户服务专员（CSR）是连接客户与组织的桥梁。用 DACUM 拆解，这个岗位的核心职责围绕「响应 → 处理 → 记录 → 协调 → 改进」展开，是 DACUM 在「服务类 / 通用职能岗位」上的典型应用，也是培训与绩效考核标准设计的常用对象。',
      stats: [
        { n: '5', l: '核心职责' },
        { n: '15+', l: '具体任务' },
        { n: '通用', l: '各行业适用' }
      ],
      duties: [
        { name: '接听与响应客户', desc: '电话、在线等渠道的即时响应', tasks: [
          ['', '接听客户电话、响应在线咨询', '第一时间响应'],
          ['', '受理客户诉求与咨询', '理解并记录问题'],
          ['', '安抚情绪激动的客户', '保持耐心与专业']
        ]},
        { name: '处理订单与投诉', desc: '订单处理、产品与配送投诉', tasks: [
          ['', '处理客户订单', '下单、改单、跟进'],
          ['', '处理产品与配送投诉', '查明原因、给出方案'],
          ['', '跟进问题闭环', '确保问题真正解决']
        ]},
        { name: '维护客户关系', desc: '沟通桥梁与跨部门协调', tasks: [
          ['', '在客户与组织间传递信息', '充当沟通桥梁'],
          ['', '协调跨部门解决问题', '联动技术、物流等部门']
        ]},
        { name: '记录与整理信息', desc: '客户资料与反馈归档', tasks: [
          ['', '建立并更新客户档案', '沉淀客户数据'],
          ['', '记录客户反馈与问题', '形成问题台账']
        ]},
        { name: '参与服务改进', desc: '基于反馈推动服务优化', tasks: [
          ['', '汇总常见问题', '识别高频痛点'],
          ['', '提出服务改进建议', '推动流程优化']
        ]}
      ],
      highlight: '客服专员案例展示了 DACUM 拆解「软性服务岗位」的能力——即使是沟通、协调这类看似模糊的工作，也能落到「接听电话」「处理投诉」「更新档案」等可观察、可考核的具体任务上。'
    },
    {
      id: 'accountant',
      icon: '🧮',
      title: '会计',
      subtitle: 'Accounting',
      tag: '中国高职课程开发',
      source: '来源：MBA 智库百科《DACUM 分析法》· 高职会计专业能力图表',
      summary: '高职会计专业的 DACUM 能力图，把会计岗位拆成 8 大工作项目，每个项目下再列具体任务，并标注「重要程度 / 难易程度」评分（满分 5）。这是国内职业教育领域最典型的 DACUM 应用范例。',
      stats: [
        { n: '8', l: '工作项目（职责）' },
        { n: '30+', l: '具体任务' },
        { n: '4.1', l: '最高重要程度' }
      ],
      duties: [
        { name: '出纳核算', desc: '库存现金与银行存款的收支、凭证、日记账与对账', tasks: [
          ['1-1', '库存现金 / 银行存款收支', '熟悉资金管理制度与审批权限，熟练操作各类支付结算业务'],
          ['1-2', '库存现金 / 银行存款凭证编制', '正确审核单据、运用会计科目、编制记账凭证'],
          ['1-3', '登记日记账', '及时登记现金、银行存款日记账并准确结账'],
          ['1-4', '库存现金 / 银行存款对账', '每日盘点现金、核对银行对账单、查明未达账项']
        ]},
        { name: '往来核算', desc: '应收、应付、预收、预付及其他往来款的分类与核算', tasks: [
          ['2-1', '应收账款的分类及核算', '审核原始凭证、判断收入类型、登记明细账并与总账核对'],
          ['2-2', '应付账款的分类及核算', '审核原始凭证、编制凭证、月末与采购合同核对'],
          ['2-3', '预收 / 预付账款的核算', '汇总明细账余额，提供给总账会计填列报表']
        ]},
        { name: '财产物资核算', desc: '存货、固定资产、在建工程等财产物资的收发与对账', tasks: [
          ['3-1', '材料 / 产成品 / 物资的收付记账', '掌握分类与计价方法，进行收发核算'],
          ['3-2', '财产物资的对账（账实卡相符）', '深入仓库现场盘点清查各项财产物资']
        ]},
        { name: '成本核算', desc: '产品成本的计算与归集', tasks: [
          ['4-1', '归集与分配生产费用', '正确划分费用界限、选择分配方法'],
          ['4-2', '计算产品成本', '运用品种法、分批法等计算完工产品成本']
        ]}
      ],
      highlight: '会计案例完整呈现了 DACUM 图表的「职责—任务」两层结构，并额外叠加了「重要程度 / 难易程度」评分，是「先分析、再排序」的教科书示范。'
    },
    {
      id: 'daycare-nurse',
      icon: '👶',
      title: '日托中心护士',
      subtitle: 'Daycare Nurse',
      tag: '韩国社区公共卫生护理研究',
      source: '来源：Research in Community & Public Health Nursing 期刊论文',
      summary: '用 DACUM 工作坊分析托儿所护士的岗位，产出 10 大职责 + 50 条任务，并经 8 位专家验证全部有效。研究发现「传染病管理」是任务数第二多的职责，凸显了它在当今时代的重要性。',
      stats: [
        { n: '10', l: '职责（Duties）' },
        { n: '50', l: '任务（Tasks）' },
        { n: '8 位', l: '专家验证' }
      ],
      duties: [
        { name: '婴幼儿健康监测', desc: 'A. Health Monitoring', tasks: [
          ['A-1', '健康状态与紧急情况应对', '含急救处理，被列为最重要的任务之一'],
          ['A-2', '口腔健康监测', '受限于工具与规范，执行率较低'],
          ['A-3', '定期视力筛查', '被评为难度最高的任务']
        ]},
        { name: '生长发育筛查', desc: 'B. Growth & Development Screening', tasks: [
          ['B-1', '身高体重等生长发育评估', '定期评估婴幼儿发育里程碑']
        ]},
        { name: '健康教育', desc: 'C. Health & Safety Education', tasks: [
          ['C-1', '面向婴幼儿、家长的健康安全教育', '普及卫生与安全知识']
        ]},
        { name: '医疗机构协作', desc: 'D. Health Management & Recommendation', tasks: [
          ['D-1', '健康问题与紧急情况应对（含急救）', '最重要的任务之一'],
          ['D-5', '急诊患者转院与医疗机构推荐', '高危任务，直接关系生命安全']
        ]},
        { name: '传染病管理', desc: 'F. Infectious Disease Management', tasks: [
          ['F-1', '传染病防控与上报', '任务数第二多的职责，重要性日益凸显']
        ]}
      ],
      highlight: '护士案例展示了 DACUM 如何服务于「岗位说明书 + 培训课程」双目标：任务按重要性和难度分级，帮助护士长确定培训优先级。'
    },
    {
      id: 'or-nurse',
      icon: '🏥',
      title: '手术室护士',
      subtitle: 'Operating Room Nurse',
      tag: '韩国基础护理学期刊研究',
      source: '来源：Journal of Korean Academy of Fundamental Nursing (2008)',
      summary: '由 10 名手术室护士组成的 DACUM 委员会，最终产出了 13 大职责 + 105 条任务，并经 422 名护士验证重要性与难度。这是任务数量最多的案例之一，说明手术室岗位极其复杂。',
      stats: [
        { n: '13', l: '职责（Duties）' },
        { n: '105', l: '任务（Tasks）' },
        { n: '422 人', l: '验证样本' }
      ],
      duties: [
        { name: '协助手术', desc: '最重要职责，判定系数 DC=6.61', tasks: [
          ['', '协助骨科手术', '最重要任务 DC=7.60'],
          ['', '协助胸外科手术', 'DC=7.38'],
          ['', '保存手术部位', 'DC=3.27，相对较低']
        ]},
        { name: '管理手术材料', desc: '判定系数最低 DC=4.22', tasks: [
          ['', '制作纱布球', '重要性最低 DC=2.39']
        ]},
        { name: '术前 / 术中 / 术后护理', desc: '贯穿手术全流程的护理职责', tasks: [
          ['', '术前准备与核查', '核对患者信息、器械'],
          ['', '术中配合与记录', '配合主刀、记录手术进程'],
          ['', '术后清点与护理', '清点器械、观察恢复']
        ]}
      ],
      highlight: '手术室护士案例用「判定系数 DC（Determinant Coefficient）」量化每项职责、任务的重要性，是 DACUM 结合量化评分的进阶应用。'
    },
    {
      id: 'ward-nurse',
      icon: '🩺',
      title: '病房 / ICU 护士',
      subtitle: 'General Ward & ICU Nurse',
      tag: '韩国护理行政学期刊研究',
      source: '来源：Korean Academy of Nursing Administration (2017)',
      summary: '面向三级医院普通病房与重症监护室（ICU）护士，用 DACUM 产出 10 大职责 + 38 条任务 + 51 项任务要素，并按「重要性 / 频率 / 难度」4 分制评分。研究发现「直接护理」重要性最高，「记录与通知」频率与难度最高。',
      stats: [
        { n: '10', l: '职责（Duties）' },
        { n: '38', l: '任务（Tasks）' },
        { n: '51', l: '任务要素' }
      ],
      duties: [
        { name: '直接护理', desc: '重要性最高的职责', tasks: [
          ['', '执行医嘱与给药', '核心护理操作'],
          ['', '病情观察与评估', '实时监测患者状况']
        ]},
        { name: '感染控制', desc: '重要性第二，但被评为相对简单', tasks: [
          ['', '手卫生与隔离防护', '执行标准预防措施'],
          ['', '消毒灭菌管理', '保障医疗环境安全']
        ]},
        { name: '记录与通知', desc: '频率与难度最高的职责', tasks: [
          ['', '护理文书书写', '高频且要求严谨'],
          ['', '异常情况上报', '及时沟通与交接']
        ]},
        { name: '安全与质量改进', desc: '研究、质量管理相关', tasks: [
          ['', '患者安全风险管理', '如防跌倒、防压疮'],
          ['', '护理质量持续改进', '参与研究、改进流程']
        ]}
      ],
      highlight: '该案例引入「任务要素（Task Elements）」这一更细粒度，把 38 条任务进一步拆成 51 个要素，展示了 DACUM 从职责到任务再到要素的三级细化。'
    },
    {
      id: 'dementia-nurse',
      icon: '🧠',
      title: '失智护理中心护士',
      subtitle: 'Dementia Care Center Nurse',
      tag: '韩国社区护理学研究',
      source: '来源：Journal of Korean Academy of Community Health Nursing (2025)',
      summary: '分析失智症护理中心护士岗位，产出 10 大职责 + 66 条任务（每项职责含 3–10 条任务）。识别出「咨询与登记管理」「个案管理」「家庭照护者支持」为最优先的三大核心职责。',
      stats: [
        { n: '10', l: '职责（Duties）' },
        { n: '66', l: '任务（Tasks）' },
        { n: '52%', l: '护士占比' }
      ],
      duties: [
        { name: '咨询与登记管理', desc: '最优先核心职责之一', tasks: [
          ['', '失智症咨询与登记', '接待患者与家属、建立档案']
        ]},
        { name: '个案管理', desc: 'Case Management，核心职责', tasks: [
          ['', '量身定制个案管理', '评估需求、制定照护方案'],
          ['', '家庭与照护者支持', '为核心职责之一，贯穿全程']
        ]},
        { name: '失智诊断筛查', desc: '重要性与频率都高的职责', tasks: [
          ['', '早期筛查与诊断协助', '配合医生开展筛查']
        ]},
        { name: '公益监护人项目', desc: '最重要也最难的职责', tasks: [
          ['', '失智症公益监护', '重要性最高、难度最大']
        ]}
      ],
      highlight: '失智护士案例体现了 DACUM 在新兴社区照护岗位上的应用——帮助一个全新职业理清职责边界，并据此设计培训方向。'
    },
    {
      id: 'lvn',
      icon: '📋',
      title: '门诊执业护士',
      subtitle: 'Ambulatory Care LVN',
      tag: '美国加州卫生人力组织',
      source: '来源：加州卫生人力组织（CA-HWI）发布的 DACUM 研究图表',
      summary: '美国门诊护理执业护士（LVN）的标准 DACUM 图表，7 大职责领域，每条任务都严格写成「动词开头」的陈述，是英文语境下「任务陈述写作标准」的最佳范例。',
      stats: [
        { n: '7', l: '职责领域' },
        { n: '100+', l: '任务陈述' },
        { n: '英文', l: '标准示范' }
      ],
      duties: [
        { name: '执行患者护理活动', desc: 'A. Perform Patient Care Activities', tasks: [
          ['A.1', 'Room patient', '接待并安置患者'],
          ['A.3', 'Perform medication reconciliation', '核对用药清单'],
          ['A.7', 'Perform wound care', '执行伤口护理'],
          ['A.29', 'Document patient care', '记录患者护理']
        ]},
        { name: '采集患者标本', desc: 'B. Collect Patient Specimens', tasks: [
          ['B.1', 'Obtain blood samples', '采集血液样本'],
          ['B.3', 'Collect urine samples', '采集尿液样本']
        ]},
        { name: '执行诊断检测', desc: 'C. Perform Diagnostic Testing', tasks: [
          ['C.1', 'Obtain patient vital signs', '测量生命体征'],
          ['C.7', 'Perform patient EKG', '执行心电图检查']
        ]},
        { name: '协调内外部服务', desc: 'D. Coordinate Services', tasks: [
          ['D.2', 'Provide SBAR report', '提供 SBAR 交接报告'],
          ['D.4', 'Coordinate radiology appointments', '协调影像检查预约']
        ]},
        { name: '参与质量管理', desc: 'E. Quality Management / Compliance', tasks: [
          ['E.1', 'Verify expiration dates', '核对药品效期'],
          ['E.3', 'Maintain narcotic control', '维持麻醉药品管控']
        ]}
      ],
      highlight: 'LVN 案例是「任务陈述写作」的英文标杆：每一条都以精确的行为动词开头（Perform / Obtain / Document），完全符合 DACUM 的写作准则。'
    }
  ];

  const tabsEl = document.getElementById('caseTabs');
  const stageEl = document.getElementById('caseStage');
  let current = 0;

  function renderTabs(){
    tabsEl.innerHTML = '';
    cases.forEach((c, i) => {
      const btn = document.createElement('button');
      btn.className = 'case-tab' + (i === current ? ' active' : '');
      btn.innerHTML = `<span class="case-tab-ico">${c.icon}</span><span>${c.title}</span>`;
      btn.addEventListener('click', () => { current = i; renderTabs(); renderStage(); });
      tabsEl.appendChild(btn);
    });
  }

  function renderStage(){
    const c = cases[current];
    const dutyHtml = c.duties.map(d => `
      <div class="case-duty">
        <button class="case-duty-head" data-toggle>
          <span class="cd-name">${escapeHtml(d.name)}</span>
          <span class="cd-desc">${escapeHtml(d.desc)}</span>
          <span class="cd-count">${d.tasks.length} 项任务</span>
          <span class="cd-arrow">▾</span>
        </button>
        <div class="case-duty-body">
          ${d.tasks.map(t => `
            <div class="case-task">
              ${t[0] ? `<span class="ct-code">${escapeHtml(t[0])}</span>` : ''}
              <span class="ct-name">${escapeHtml(t[1])}</span>
              <span class="ct-note">${escapeHtml(t[2])}</span>
            </div>`).join('')}
        </div>
      </div>`).join('');

    stageEl.innerHTML = `
      <div class="case-card">
        <div class="case-head">
          <span class="case-icon">${c.icon}</span>
          <div class="case-title-wrap">
            <div class="case-kicker">${escapeHtml(c.tag)}</div>
            <h3 class="case-title">${escapeHtml(c.title)} <span class="case-sub">${escapeHtml(c.subtitle)}</span></h3>
          </div>
        </div>
        <div class="case-stats">
          ${c.stats.map(s => `<div class="case-stat"><b>${escapeHtml(s.n)}</b><span>${escapeHtml(s.l)}</span></div>`).join('')}
        </div>
        <p class="case-summary">${escapeHtml(c.summary)}</p>
        <div class="case-duties">
          ${dutyHtml}
        </div>
        <div class="case-highlight">🌟 亮点：${escapeHtml(c.highlight)}</div>
        <p class="case-source">${escapeHtml(c.source)}</p>
      </div>`;

    // 职责展开/收起
    stageEl.querySelectorAll('[data-toggle]').forEach(head => {
      head.addEventListener('click', () => {
        const duty = head.parentElement;
        const wasOpen = duty.classList.contains('open');
        // 可同时展开多个，或点已开的收起
        duty.classList.toggle('open', !wasOpen);
      });
    });
  }

  renderTabs();
  renderStage();
})();
