const API_BASE = 'https://api.sunwe.dpdns.org';
const BUILDER_NATURAL = '自然生成', BUILDER_MULTI = '多人', BUILDER_UNKNOWN = '未知';

const I18N = {
  zh: {
    docTitle:'66QN 服务器地标坐标总览', title:'66QN 服务器地标坐标总览', subtitle:'Minecraft Java 26.2 · 坐标均为准确无误',
    themeDark:'深色', themeLight:'浅色',
    skinClassic:'经典', skinMinecraft:'像素',
    searchPlaceholder:'搜索名称、说明、坐标、标签…',
    filterDim:'维度', filterCat:'类别',
    chipAll:'全部', chipOverworld:'主世界', chipNether:'下界', chipEnd:'末地',
    chipTech:'生电', chipTrade:'交易', chipFarm:'农场',
    tagLegacy:'遗留', tagCheap:'低价', tagDead:'已毁',
    btnExpandAll:'全部展开', btnCollapseAll:'全部收起', btnAddLandmark:'新增地标', btnImport:'批量导入', btnSelectMode:'批量选择',
    secUsable:'可使用', secUnusable:'不可使用', secMachines:'生电设施详情',
    secFuture:'未来 / 正在筹备 / 正在建设', emptyText:'没有匹配的地标',
    friendLinks:'友情链接', footerAuthor:'网站作者的ID：robot003', linkServerSite:'官网',
    statLandmarks:'个可使用地标', statPoints:'个传送点位', statTech:'处生电', statTrade:'处交易', statFarm:'处农场',
    btnTeleport:'传送', btnCopied:'已复制',
    toastCopied:'已复制：', toastCopyFail:'复制失败',
    toastAdded:'新增成功！', toastUpdated:'更新成功！', toastAddFail:'操作失败：', toastDeleted:'删除成功！',
    toastDlMd:'Markdown 已下载', toastDlTxt:'TXT 已下载', toastDlCsv:'CSV 已下载',
    toastSkinMc:'已切换到像素皮肤（实验性）', toastSkinGh:'已切换回经典皮肤',
    confirmDelete:'确定删除「{name}」？此操作不可恢复。',
    childPoints:'个点位', expand:'展开', collapse:'收起',
    kvCoords:'坐标', kvRate:'效率', kvNote:'说明', kvProducts:'产物', kvBuilder:'建造者',
    addTitle:'新增地标', addTitleEdit:'编辑地标', addSubtitle:'填写以下信息，提交后即刻生效',
    addNameZh:'名称（中文）', addNameEn:'英文名称（可选）', addBuilder:'建造者',
    addDim:'维度', addCat:'状态',
    catUsable:'可使用', catUnusable:'不可使用', catFuture:'未来计划',
    addTags:'标签（可多选）', coordMode:'坐标模式',
    modeSingle:'单点坐标', modeMulti:'多地点列表',
    locationList:'地点列表', addLocation:'添加一个地点',
    addNote:'补充说明', btnCancel:'取消', btnSubmit:'提交', btnSubmitting:'提交中…',
    techExtra:'生电专属信息', addRate:'效率说明', addProducts:'产物（逗号分隔）',
    errBuilder:'请填写建造者',
    errTechRate:'勾选“生电”后必须填写效率说明',
    errTechProducts:'勾选“生电”后必须填写产物',
    errNoLocation:'请至少填写一个有效的地点坐标',
    builderNatural:'自然生成', builderMulti:'多人', builderUnknown:'未知',
    navTitle:'导航', navOverview:'概览', navUsable:'可使用', navUnusable:'不可使用',
    navMachines:'生电设施', navFuture:'未来计划', navLinks:'友情链接',
    btnDownload:'下载',
    dlMdTitle:'Markdown 文档', dlMdSub:'保留格式',
    dlTxtTitle:'纯文本', dlTxtSub:'适合直接查看',
    dlCsvTitle:'CSV 表格', dlCsvSub:'可用 Excel 打开',
    dTitle:'66QN 服务器地标坐标总览',
    dBasicInfo:'基本信息', dServer:'服务器', dVersion:'版本', dAuthor:'作者', dExportTime:'导出时间',
    dTagLegend:'标签说明', dAvailable:'可使用', dUnavailable:'不可使用', dFuture:'未来 / 正在筹备 / 正在建设',
    dTechTitle:'生电设施详情',
    dCoord:'坐标', dRate:'效率', dProducts:'产物', dNote:'说明', dBuilder:'建造者',
    dTags:'标签', dDimension:'维度', dStatus:'状态', dPoint:'点位', dName:'名称',
    dX:'X', dY:'Y', dZ:'Z',
    importTitle:'批量导入', importSubtitle:'支持 CSV 和 JSON，同名自动合并，未知标签自动忽略',
    importChooseFile:'选择文件', importSubmit:'开始导入',
    importPlaceholder:'在此粘贴 CSV 或 JSON...',
    importParseOk:'✓ 已解析 {n} 条地标',
    importParseMerged:'✓ 已解析 {n} 条（{m} 组合并 → {f} 条）',
    importParseIgnored:'✓ 已解析 {n} 条（忽略 {i} 个未知标签）',
    importParseMergedAndIgnored:'✓ 已解析 {n} 条（{m} 组合并、忽略 {i} 未知标签 → {f} 条）',
    importParseEmpty:'⚠️ 未解析到有效数据',
    importParseErr:'❌ 格式错误',
    importConfirm:'确定导入 {n} 条地标？',
    importProgress:'导入中 {i}/{n}…',
    importDone:'✓ 导入完成：成功 {s} 条',
    importDoneWithFail:'导入完成：成功 {s}，失败 {f}',
    importEmpty:'没有可导入的数据',
    importPreviewTitle:'预览',
    batchCount:'已选', batchItems:'项',
    btnSelectAll:'全选可见', btnClearSel:'清除',
    btnBatchEdit:'批量编辑', btnBatchDelete:'批量删除',
    batchEditTitle:'批量编辑', batchEditSubtitle:'将对选中的', batchEditSubtitle2:'条地标应用以下更改（未修改的字段保持不变）',
    batchStatus:'状态', batchDim:'维度', batchBuilder:'建造者', batchBuilderHint:'留空则保持不变',
    batchAddTags:'添加标签', batchRemoveTags:'移除标签',
    batchBuilderClear:'清空', batchKeep:'保持不变',
    batchApply:'应用更改',
    batchDeleted:'已删除 {n} 条地标',
    batchDeleteConfirm:'确定删除选中的 {n} 条地标？',
    batchUpdated:'已更新 {n} 条地标',
    batchNoChange:'未选择任何更改项',
    batchApplying:'处理中 {i}/{n}…',
    toastSelectModeOn:'已进入批量选择模式', toastSelectModeOff:'已退出批量选择模式',
    loadingData:'正在加载数据… 如果长时间无法加载，请检查网络或刷新页面。',
    loadFailed:'数据加载失败，请刷新页面重试。',
    copyModalTitle:'选择传送指令',
    copyOptOp:'OP 指令 (跨维度 / 需权限)',
    copyOptOpDesc:'使用 `/execute` 语法，即使不在目标维度也能直接传送。',
    copyOptTp:'无权限指令 (需先到维度)',
    copyOptTpDesc:'使用原版 `/tp` 语法，请先前往该维度，否则传送会失败。'
  },
  en: {
    docTitle:'66QN Server Landmarks', title:'66QN Server Landmarks', subtitle:'Minecraft Java 26.2 · All coordinates verified',
    themeDark:'Dark', themeLight:'Light',
    skinClassic:'Classic', skinMinecraft:'Pixel',
    searchPlaceholder:'Search name, note, coords, tags…',
    filterDim:'Dimension', filterCat:'Category',
    chipAll:'All', chipOverworld:'Overworld', chipNether:'Nether', chipEnd:'The End',
    chipTech:'Tech', chipTrade:'Trade', chipFarm:'Farm',
    tagLegacy:'Legacy', tagCheap:'Cheap', tagDead:'Ruined',
    btnExpandAll:'Expand All', btnCollapseAll:'Collapse All', btnAddLandmark:'Add', btnImport:'Import', btnSelectMode:'Select',
    secUsable:'Available', secUnusable:'Unavailable', secMachines:'Tech Facilities',
    secFuture:'Future / Planned / In Progress', emptyText:'No matching landmarks',
    friendLinks:'Friend Links', footerAuthor:'Author ID: robot003', linkServerSite:'Official Site',
    statLandmarks:'landmarks', statPoints:'points', statTech:'tech', statTrade:'trade', statFarm:'farm',
    btnTeleport:'TP', btnCopied:'Copied',
    toastCopied:'Copied: ', toastCopyFail:'Copy failed',
    toastAdded:'Added!', toastUpdated:'Updated!', toastAddFail:'Failed: ', toastDeleted:'Deleted!',
    toastDlMd:'Markdown downloaded', toastDlTxt:'TXT downloaded', toastDlCsv:'CSV downloaded',
    toastSkinMc:'Switched to Pixel skin (experimental)', toastSkinGh:'Switched back to Classic skin',
    confirmDelete:'Delete "{name}"?',
    childPoints:'points', expand:'Expand', collapse:'Collapse',
    kvCoords:'Coords', kvRate:'Rate', kvNote:'Note', kvProducts:'Products', kvBuilder:'Builder',
    addTitle:'Add Landmark', addTitleEdit:'Edit Landmark', addSubtitle:'Fill in the info below',
    addNameZh:'Name (Chinese)', addNameEn:'Name (English, optional)', addBuilder:'Builder',
    addDim:'Dimension', addCat:'Category',
    catUsable:'Available', catUnusable:'Unavailable', catFuture:'Future',
    addTags:'Tags', coordMode:'Coordinate Mode',
    modeSingle:'Single point', modeMulti:'Multi-point',
    locationList:'Location List', addLocation:'Add a location',
    addNote:'Note', btnCancel:'Cancel', btnSubmit:'Submit', btnSubmitting:'Submitting…',
    techExtra:'Tech-specific Info', addRate:'Rate', addProducts:'Products (comma-separated)',
    errBuilder:'Builder is required',
    errTechRate:'Rate required when Tech tag selected',
    errTechProducts:'Products required when Tech tag selected',
    errNoLocation:'Please add at least one valid location',
    builderNatural:'Natural', builderMulti:'Multi-person', builderUnknown:'Unknown',
    navTitle:'Navigation', navOverview:'Overview', navUsable:'Available', navUnusable:'Unavailable',
    navMachines:'Tech', navFuture:'Future', navLinks:'Links',
    btnDownload:'Download',
    dlMdTitle:'Markdown File', dlMdSub:'Keeps formatting',
    dlTxtTitle:'Plain Text', dlTxtSub:'Easy to read',
    dlCsvTitle:'CSV Table', dlCsvSub:'Open with Excel',
    dTitle:'66QN Server Landmarks',
    dBasicInfo:'Basic Info', dServer:'Server', dVersion:'Version', dAuthor:'Author', dExportTime:'Export Time',
    dTagLegend:'Tag Legend', dAvailable:'Available', dUnavailable:'Unavailable', dFuture:'Future / Planned / In Progress',
    dTechTitle:'Tech Facilities',
    dCoord:'Coords', dRate:'Rate', dProducts:'Products', dNote:'Note', dBuilder:'Builder',
    dTags:'Tags', dDimension:'Dimension', dStatus:'Status', dPoint:'Point', dName:'Name',
    dX:'X', dY:'Y', dZ:'Z',
    importTitle:'Bulk Import', importSubtitle:'CSV/JSON. Same names merged, unknown tags ignored',
    importChooseFile:'Choose File', importSubmit:'Import',
    importPlaceholder:'Paste CSV or JSON here...',
    importParseOk:'✓ Parsed {n} landmarks',
    importParseMerged:'✓ Parsed {n} ({m} merged → {f})',
    importParseIgnored:'✓ Parsed {n} (ignored {i} unknown tags)',
    importParseMergedAndIgnored:'✓ Parsed {n} ({m} merged, {i} tags ignored → {f})',
    importParseEmpty:'⚠️ No valid data',
    importParseErr:'❌ Parse error',
    importConfirm:'Import {n} landmarks?',
    importProgress:'Importing {i}/{n}…',
    importDone:'✓ Done: {s} succeeded',
    importDoneWithFail:'Done: {s} ok, {f} failed',
    importEmpty:'No data to import',
    importPreviewTitle:'Preview',
    batchCount:'Selected', batchItems:'items',
    btnSelectAll:'Select All Visible', btnClearSel:'Clear',
    btnBatchEdit:'Batch Edit', btnBatchDelete:'Batch Delete',
    batchEditTitle:'Batch Edit', batchEditSubtitle:'Apply changes to', batchEditSubtitle2:'selected items',
    batchStatus:'Status', batchDim:'Dimension', batchBuilder:'Builder', batchBuilderHint:'Leave empty to keep',
    batchAddTags:'Add Tags', batchRemoveTags:'Remove Tags',
    batchBuilderClear:'Clear', batchKeep:'Keep',
    batchApply:'Apply',
    batchDeleted:'Deleted {n}',
    batchDeleteConfirm:'Delete {n} selected items?',
    batchUpdated:'Updated {n}',
    batchNoChange:'No changes selected',
    batchApplying:'Processing {i}/{n}…',
    toastSelectModeOn:'Batch select mode on', toastSelectModeOff:'Batch select mode off',
    loadingData:'Loading data... Please check network or refresh if it takes too long.',
    loadFailed:'Failed to load data. Please refresh.',
    copyModalTitle:'Select TP Command',
    copyOptOp:'OP Command (Cross-dim / Requires OP)',
    copyOptOpDesc:'Uses `/execute` syntax. Works even if you are in another dimension.',
    copyOptTp:'Vanilla TP (Go to dim first)',
    copyOptTpDesc:'Uses `/tp` syntax. You must be in the same dimension, otherwise it fails.'
  }
};

let curLang = 'zh';
function t(k){ return (I18N[curLang] && I18N[curLang][k]) || k; }
function tFmt(k, v){ let s = t(k); Object.keys(v).forEach(x => s = s.replace('{'+x+'}', v[x])); return s; }

const ICON = {
  pin:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  copy:'<svg class="ico" viewBox="0 0 24 24"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
  check:'<svg class="ico" viewBox="0 0 24 24"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  trash:'<svg class="ico" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
  edit:'<svg class="ico" viewBox="0 0 24 24"><path d="m14 7 3 3-9 9H5v-3l9-9z"/><path d="m13 8 3-3 3 3-3 3z"/></svg>',
  chart:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/></svg>',
  box:'<svg class="ico" viewBox="0 0 24 24"><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3z"/><path d="m4 7.5 8 4.5 8-4.5"/><path d="M12 12v9"/></svg>',
  tool:'<svg class="ico" viewBox="0 0 24 24"><path d="m14 7 3 3-9 9H5v-3l9-9z"/><path d="m13 8 3-3 3 3-3 3z"/></svg>',
  sun:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/></svg>',
  moon:'<svg class="ico" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  layers:'<svg class="ico" viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5z"/><path d="m3 13 9 5 9-5"/></svg>',
  monitor:'<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>',
  inbox:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 13h4l2 3h4l2-3h4"/><path d="M6 4h12l2 9v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5l2-9z"/></svg>',
  expand2:'<svg class="ico" viewBox="0 0 24 24"><path d="m7 6 6 6-6 6"/><path d="m13 6 6 6-6 6"/></svg>',
  collapse2:'<svg class="ico" viewBox="0 0 24 24"><path d="m6 6 6 6-6 6"/><path d="m12 6 6 6-6 6"/></svg>',
  tagTech:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/></svg>',
  tagTrade:'<svg class="ico" viewBox="0 0 24 24"><path d="M4 9h13"/><path d="m14 6 3 3-3 3"/><path d="M20 15H7"/><path d="m10 12-3 3 3 3"/></svg>',
  tagFarm:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 21V9"/><path d="M12 9c0-3-2-5-5-5 0 3 2 5 5 5z"/><path d="M12 13c0-3 2-5 5-5 0 3-2 5-5 5z"/></svg>',
  tagLegacy:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  tagCheap:'<svg class="ico" viewBox="0 0 24 24"><path d="M20 12 4 12"/><path d="m9 7-5 5 5 5"/></svg>',
  tagDead:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="m9 9 6 6"/><path d="m15 9-6 6"/></svg>',
  user:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  globe:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>',
  users:'<svg class="ico" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0"/><path d="M15 20a5 5 0 0 1 7-4.6"/></svg>',
  question:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9.2 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4"/><path d="M12 17.5h.01"/></svg>',
  info:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8h.01"/><path d="M11 12h1v4"/></svg>',
  skinGh:'<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
  skinMc:'<svg class="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/><path d="M15 3v18"/><rect x="6" y="6" width="3" height="3" fill="currentColor"/><rect x="12" y="12" width="3" height="3" fill="currentColor"/><rect x="15" y="15" width="3" height="3" fill="currentColor"/></svg>'
};

const DIM_ICON = {
  overworld:'<svg class="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>',
  nether:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 3c3 5 5 6 5 10a5 5 0 0 1-10 0c0-4 2-5 5-10z"/></svg>',
  end:'<svg class="ico" viewBox="0 0 24 24"><path d="M12 3 4 20l8-4 8 4-8-17z"/><path d="M12 3v13"/></svg>'
};

const TAG_META = {
  '生电':{cls:'tech', ico:ICON.tagTech, cat:'tech'},
  '交易':{cls:'trade', ico:ICON.tagTrade, cat:'trade'},
  '农场':{cls:'farm', ico:ICON.tagFarm, cat:'farm'},
  '遗留':{cls:'legacy', ico:ICON.tagLegacy},
  '低价':{cls:'cheap', ico:ICON.tagCheap},
  '已毁':{cls:'dead', ico:ICON.tagDead}
};

const DIMS = { overworld:{prefix:'overworld'}, nether:{prefix:'the_nether'}, end:{prefix:'the_end'} };
const DIM_LABEL = { zh:{overworld:'主世界',nether:'下界',end:'末地'}, en:{overworld:'Overworld',nether:'Nether',end:'The End'} };
const TAG_LABEL = { zh:{生电:'生电',交易:'交易',农场:'农场',遗留:'遗留',低价:'低价',已毁:'已毁'}, en:{生电:'Tech',交易:'Trade',农场:'Farm',遗留:'Legacy',低价:'Cheap',已毁:'Ruined'} };
const ROLE_LABEL = { zh:{hang:'挂机',hangTop:'挂机（顶）',collect:'收集',main:'主体','点位':'点位'}, en:{hang:'AFK',hangTop:'AFK (top)',collect:'Collect',main:'Main','点位':'Point'} };
const CAT_LABEL = { zh:{usable:'可使用',unusable:'不可使用',future:'未来计划'}, en:{usable:'Available',unusable:'Unavailable',future:'Future'} };
const CAT_FROM_LABEL = { '可使用':'usable','不可使用':'unusable','未来计划':'future','Available':'usable','Unavailable':'unusable','Future':'future' };
const DIM_FROM_LABEL = { '主世界':'overworld','下界':'nether','末地':'end','Overworld':'overworld','Nether':'nether','The End':'end' };
const TAG_FROM_LABEL = { '生电':'生电','交易':'交易','农场':'农场','遗留':'遗留','低价':'低价','已毁':'已毁', 'Tech':'生电','Trade':'交易','Farm':'农场','Legacy':'遗留','Cheap':'低价','Ruined':'已毁' };
const ROLE_FROM_LABEL = { '挂机':'hang','挂机（顶）':'hangTop','收集':'collect','主体':'main','点位':'点位','AFK':'hang','AFK (top)':'hangTop','Collect':'collect','Main':'main','Point':'点位' };

const DATA = { usable: [], unusable: [], machines: [], future: [] };
const $ = s => document.querySelector(s);

let selectedIds = new Set();
let selectMode = false;
let currentQuery = '';
let allOpen = false;
let editingId = null;
let selectedTags = [];
let coordMode = 'single';
let batchAddTags = new Set();
let batchRemoveTags = new Set();
let currentCopyCommands = { op: '', tp: '' };

function pick(o){ if (typeof o === 'string') return o; if (!o) return ''; return o[curLang] || o.zh || o.en || ''; }
function dimLabel(d){ return (DIM_LABEL[curLang]||DIM_LABEL.zh)[d] || d; }
function tagLabel(x){ return (TAG_LABEL[curLang]||TAG_LABEL.zh)[x] || x; }
function roleLabel(r){ return (ROLE_LABEL[curLang]||ROLE_LABEL.zh)[r] || r; }
function catLabel(c){ return (CAT_LABEL[curLang]||CAT_LABEL.zh)[c] || c; }
function catsOf(tags){ return (tags||[]).map(x => TAG_META[x] && TAG_META[x].cat).filter(Boolean); }
function tagHTML(tag){ const m = TAG_META[tag]; if (!m) return ''; return `<span class="tag ${m.cls}">${m.ico}${tagLabel(tag)}</span>`; }
function builderIcon(b){ if (b === BUILDER_NATURAL) return ICON.globe; if (b === BUILDER_MULTI) return ICON.users; if (b === BUILDER_UNKNOWN) return ICON.question; return ICON.user; }
function builderClass(b){ if (b === BUILDER_NATURAL) return ' builder-natural'; if (b === BUILDER_MULTI) return ' builder-multi'; return ''; }
function sanitizeTags(arr){ if (!Array.isArray(arr)) return []; return arr.filter(x => TAG_META[x]); }
function escapeHtml(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function highlight(text, query){
  const esc = escapeHtml(text);
  if (!query) return esc;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return esc.replace(new RegExp('(' + q + ')', 'gi'), '<mark class="hl">$1</mark>');
}

function setSkin(skin, silent){
  document.documentElement.setAttribute('data-skin', skin);
  const ico = document.getElementById('skin-ico');
  const lbl = document.getElementById('skin-lbl');
  if (ico){
    const svgStr = (skin === 'minecraft' ? ICON.skinMc : ICON.skinGh).replace('<svg ', '<svg id="skin-ico" ');
    ico.outerHTML = svgStr;
  }
  if (lbl) lbl.textContent = skin === 'minecraft' ? t('skinMinecraft') : t('skinClassic');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor){
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (skin === 'minecraft') themeColor.setAttribute('content', isDark ? '#1a1a1a' : '#c6c6c6');
    else themeColor.setAttribute('content', isDark ? '#0d1117' : '#f6f8fa');
  }
  try { localStorage.setItem('skin', skin); } catch(_) {}
  if (!silent){
    const msg = skin === 'minecraft' ? t('toastSkinMc') : t('toastSkinGh');
    if (typeof toast === 'function') toast(msg);
  }
}

function applyLang(){
  document.querySelectorAll('[data-i18n]').forEach(el => { const k = el.dataset.i18n; if (I18N[curLang][k]) el.innerHTML = I18N[curLang][k]; });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => { const k = el.dataset.i18nPh; if (I18N[curLang][k]) el.placeholder = I18N[curLang][k]; });
  document.title = t('docTitle');
  document.documentElement.lang = curLang === 'zh' ? 'zh-CN' : 'en';
  const lbl = document.getElementById('theme-lbl'); if (lbl) lbl.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? t('themeDark') : t('themeLight');
  const expLbl = document.getElementById('expand-all-lbl'); if (expLbl) expLbl.textContent = allOpen ? t('btnCollapseAll') : t('btnExpandAll');
  const titleEl = document.getElementById('add-modal-title-text'); if (titleEl) titleEl.textContent = editingId ? t('addTitleEdit') : t('addTitle');
  const skinLbl = document.getElementById('skin-lbl');
  if (skinLbl) skinLbl.textContent = document.documentElement.getAttribute('data-skin') === 'minecraft' ? t('skinMinecraft') : t('skinClassic');
  updateImportFormatHelp(); updateBatchBar();
  try { localStorage.setItem('lang', curLang); } catch(_) {}
}

function convertLM(row){
  let children = [], tags = [], pz = [], pe = [];
  try { children = JSON.parse(row.children || '[]'); } catch(_) {}
  try { tags = JSON.parse(row.tags || '[]'); } catch(_) {}
  try { pz = JSON.parse(row.products_zh || '[]'); } catch(_) {}
  try { pe = JSON.parse(row.products_en || '[]'); } catch(_) {}
  return { id: row.id, name: { zh: row.name_zh, en: row.name_en || '' }, builder: row.builder || '', dim: row.dimension, x: row.x, y: row.y, z: row.z, category: row.category || 'usable', tags: sanitizeTags(tags), note: row.note_zh ? { zh: row.note_zh, en: row.note_en || '' } : null, children, rate: { zh: row.rate_zh || '', en: row.rate_en || '' }, products: { zh: pz, en: pe }, dead: row.category === 'unusable' };
}

async function loadData(){
  try {
    const res = await fetch(`${API_BASE}/api/landmarks`);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const landmarks = await res.json();
    DATA.usable   = landmarks.filter(l => l.category === 'usable').map(convertLM);
    DATA.unusable = landmarks.filter(l => l.category === 'unusable').map(convertLM);
    DATA.future   = landmarks.filter(l => l.category === 'future').map(convertLM);
    
    document.getElementById('loading-tip').style.display = 'none';
    document.querySelectorAll('.sec-title[id^="anchor-"]').forEach(el => el.style.display = 'flex');
    
    renderAll();
  } catch (err) { 
    console.error(err); 
    document.getElementById('loading-tip').innerHTML = `<div style="color:var(--danger);font-weight:bold;">${t('loadFailed')}</div>`;
  }
}

function landmarkHTML(l){
  const tags = (l.tags || []).map(tagHTML).join('');
  const cats = catsOf(l.tags).join(',');
  const deadCls = l.dead ? ' dead' : '';
  const lnameRaw = pick(l.name);
  const lname = highlight(lnameRaw, currentQuery);
  const lnoteRaw = l.note ? pick(l.note) : '';
  const lnote = lnoteRaw ? highlight(lnoteRaw, currentQuery) : '';
  const builderRaw = l.builder || '';
  const builderHl = builderRaw ? highlight(builderRaw, currentQuery) : '';
  const dlabel = dimLabel(l.dim);
  const builderLine = builderRaw ? `<div class="lm-meta"><span class="meta-item${builderClass(builderRaw)}">${builderIcon(builderRaw)}${t('kvBuilder')}：${builderHl}</span></div>` : '';
  const isSelected = l.id && selectedIds.has(l.id);
  const selCls = isSelected ? ' selected' : '';
  const checkbox = l.id ? `<label class="lm-check-wrap" onclick="event.stopPropagation()"><input type="checkbox" class="lm-check" data-lm-id="${l.id}" ${isSelected ? 'checked' : ''}></label>` : '';
  const actions = l.id ? `<button class="btn-icon edit" data-edit-id="${l.id}" title="Edit">${ICON.edit}</button><button class="btn-icon delete" data-delete-id="${l.id}" data-delete-name="${lnameRaw.replace(/"/g,'&quot;')}" title="Delete">${ICON.trash}</button>` : '';

  if (l.children && l.children.length){
    const childrenHTML = l.children.map(c => {
      const prefix = (DIMS[l.dim] && DIMS[l.dim].prefix) ? DIMS[l.dim].prefix : 'overworld';
      const opCmd = `/execute in minecraft:${prefix} run tp @s ${c.x} ${c.y} ${c.z}`;
      const tpCmd = `/tp ${c.x} ${c.y} ${c.z}`;
      const ico = (c.label || '').indexOf('collect') >= 0 ? ICON.inbox : ICON.monitor;
      return `<div class="child-row"><span class="child-label">${ico}${roleLabel(c.label)}</span><code class="coords">${c.x} ${c.y} ${c.z}</code><button class="btn-copy" data-op="${opCmd}" data-tp="${tpCmd}">${ICON.copy}${t('btnTeleport')}</button></div>`;
    }).join('');
    const searchText = [lnameRaw, lnoteRaw, builderRaw, dlabel, ...(l.tags||[]).map(tagLabel)].join(' ').toLowerCase();
    return `<article class="lm lm-group${deadCls}${selCls}" data-id="${l.id||''}" data-dim="${l.dim}" data-cats="${cats}" data-search="${escapeHtml(searchText)}">
      <div class="lm-main" role="button" tabindex="0" aria-expanded="false">
        ${checkbox}
        <div class="lm-left-inner">
          <div class="lm-name">${ICON.pin}${lname}${tags}<span class="child-count">${ICON.layers}${l.children.length} ${t('childPoints')}</span></div>
          ${lnote ? `<div class="lm-note">${lnote}</div>` : ''}
          ${builderLine}
        </div>
        <div class="lm-right">
          <span class="dim-badge ${l.dim}">${DIM_ICON[l.dim]}${dlabel}</span>
          <span class="expand-hint"><svg class="ico chev" viewBox="0 0 24 24"><path d="m9 6 6 6-6 6"/></svg><span class="expand-text">${t('expand')}</span></span>
          ${actions}
        </div>
      </div>
      <div class="lm-children">${childrenHTML}</div>
    </article>`;
  }

  const prefix = (DIMS[l.dim] && DIMS[l.dim].prefix) ? DIMS[l.dim].prefix : 'overworld';
  const opCmd = `/execute in minecraft:${prefix} run tp @s ${l.x} ${l.y} ${l.z}`;
  const tpCmd = `/tp ${l.x} ${l.y} ${l.z}`;
  const searchText = [lnameRaw, lnoteRaw, builderRaw, l.x, l.y, l.z, dlabel, ...(l.tags||[]).map(tagLabel)].join(' ').toLowerCase();
  return `<article class="lm${deadCls}${selCls}" data-id="${l.id||''}" data-dim="${l.dim}" data-cats="${cats}" data-search="${escapeHtml(searchText)}">
    <div class="lm-left">
      ${checkbox}
      <div class="lm-left-inner">
        <div class="lm-name">${ICON.pin}${lname}${tags}</div>
        ${lnote ? `<div class="lm-note">${lnote}</div>` : ''}
        ${builderLine}
      </div>
    </div>
    <div class="lm-right">
      <span class="dim-badge ${l.dim}">${DIM_ICON[l.dim]}${dlabel}</span>
      <code class="coords">${l.x} ${l.y} ${l.z}</code>
      <button class="btn-copy" data-op="${opCmd}" data-tp="${tpCmd}">${ICON.copy}${t('btnTeleport')}</button>
      ${actions}
    </div>
  </article>`;
}

function renderList(sel, arr){ $(sel).innerHTML = arr.map(landmarkHTML).join(''); }

function renderStats(){
  const totalPoints = [...DATA.usable, ...DATA.unusable].reduce((n, l) => n + (l.children && l.children.length ? l.children.length : 1), 0);
  const cntTech = DATA.usable.filter(l => catsOf(l.tags).includes('tech')).length;
  const cntTrade = DATA.usable.filter(l => catsOf(l.tags).includes('trade')).length;
  const cntFarm = DATA.usable.filter(l => catsOf(l.tags).includes('farm')).length;
  $('#stats').innerHTML = `
    <div class="stat">${ICON.pin}<b>${DATA.usable.length}</b> ${t('statLandmarks')}</div>
    <div class="stat">${ICON.layers}<b>${totalPoints}</b> ${t('statPoints')}</div>
    <div class="stat">${ICON.tagTech}<b>${cntTech}</b> ${t('statTech')}</div>
    <div class="stat">${ICON.tagTrade}<b>${cntTrade}</b> ${t('statTrade')}</div>
    <div class="stat">${ICON.tagFarm}<b>${cntFarm}</b> ${t('statFarm')}</div>
  `;
}

function renderMachines(){
  const techs = DATA.usable.filter(l => catsOf(l.tags).includes('tech'));
  $('#machines').innerHTML = techs.map(m => {
    let pointsHTML = '';
    if (m.children && m.children.length){
      pointsHTML = m.children.map(p => `<code>${p.x} ${p.y} ${p.z}</code><span style="font-size:11.5px;color:var(--muted);margin-right:6px">（${roleLabel(p.label)} · ${dimLabel(m.dim)}）</span>`).join('');
    } else {
      pointsHTML = `<code>${m.x} ${m.y} ${m.z}</code><span style="font-size:11.5px;color:var(--muted);margin-right:6px">（${dimLabel(m.dim)}）</span>`;
    }
    const products = m.products && (curLang === 'zh' ? m.products.zh : m.products.en);
    const rate = pick(m.rate) || '—';
    const builderRow = m.builder ? `<div class="kv"><span class="k">${builderIcon(m.builder)}${t('kvBuilder')}</span><span class="v">${m.builder}</span></div>` : '';
    return `<div class="machine"><h3>${ICON.tool}${pick(m.name)}${(m.tags||[]).map(tagHTML).join('')}</h3>${builderRow}<div class="kv"><span class="k">${ICON.pin}${t('kvCoords')}</span><span class="v">${pointsHTML}</span></div><div class="kv"><span class="k">${ICON.chart}${t('kvRate')}</span><span class="v">${rate}</span></div>${m.note ? `<div class="kv"><span class="k">${ICON.info}${t('kvNote')}</span><span class="v">${pick(m.note)}</span></div>` : ''}<div class="kv"><span class="k">${ICON.box}${t('kvProducts')}</span><span class="v products">${Array.isArray(products) ? products.map(p => `<span>${p}</span>`).join('') : ''}</span></div></div>`;
  }).join('');
}

function renderFuture(){
  $('#future').innerHTML = DATA.future.map(f => `<div class="fut">${ICON.info}<span class="fut-name">${pick(f.name)}</span>${(f.tags||[]).map(tagHTML).join('')}${f.note ? `<span class="fut-note">${pick(f.note)}</span>` : ''}</div>`).join('');
}

function setGroupOpen(group, open){ group.classList.toggle('open', open); const text = group.querySelector('.expand-text'); if (text) text.textContent = open ? t('collapse') : t('expand'); }

function syncExpandAllBtn(){
  const ico = document.getElementById('expand-all-ico');
  if (ico) ico.outerHTML = (allOpen ? ICON.collapse2 : ICON.expand2).replace('<svg ', '<svg id="expand-all-ico" ');
  const lbl = document.getElementById('expand-all-lbl'); if (lbl) lbl.textContent = allOpen ? t('btnCollapseAll') : t('btnExpandAll');
}

let curDim = 'all', curCat = 'all';
function applyFilter(){
  const q = ($('#search').value || '').trim().toLowerCase();
  const qChanged = q !== currentQuery;
  currentQuery = q;
  if (qChanged){ renderList('#sec-usable', DATA.usable); renderList('#sec-unusable', DATA.unusable); }
  let visible = 0;
  document.querySelectorAll('.lm').forEach(el => {
    const okDim = curDim === 'all' || el.dataset.dim === curDim;
    const cats = (el.dataset.cats || '').split(',').filter(Boolean);
    const okCat = curCat === 'all' || cats.includes(curCat);
    const searchText = (el.dataset.search || '').toLowerCase();
    const okQ = !q || q.split(/\s+/).filter(Boolean).every(word => searchText.includes(word));
    const show = okDim && okCat && okQ;
    el.style.display = show ? '' : 'none';
    if (show) visible++;
  });
  document.querySelectorAll('[data-section]').forEach(sec => {
    const any = [...sec.querySelectorAll('.lm')].some(el => el.style.display !== 'none');
    sec.style.display = any ? '' : 'none';
  });
  $('#empty').style.display = visible === 0 ? 'block' : 'none';
}

async function copyText(text){ try { await navigator.clipboard.writeText(text); return true; } catch (_) { const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); let ok = false; try { ok = document.execCommand('copy'); } catch(_){} ta.remove(); return ok; } }

let toastTimer = null;
function toast(msg){ const el = $('#toast'); $('#toast-msg').textContent = msg; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 1800); }

const root = document.documentElement;
function setTheme(mode){
  root.setAttribute('data-theme', mode);
  const cur = document.getElementById('theme-ico');
  if (cur) cur.outerHTML = (mode === 'dark' ? ICON.moon : ICON.sun).replace('<svg ', '<svg id="theme-ico" ');
  const lbl = document.getElementById('theme-lbl'); if (lbl) lbl.textContent = mode === 'dark' ? t('themeDark') : t('themeLight');
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor){
    const skin = root.getAttribute('data-skin') || 'github';
    if (skin === 'minecraft') themeColor.setAttribute('content', mode === 'dark' ? '#1a1a1a' : '#c6c6c6');
    else themeColor.setAttribute('content', mode === 'dark' ? '#0d1117' : '#f6f8fa');
  }
  try { localStorage.setItem('theme', mode); } catch(_) {}
}

function renderAll(){
  renderList('#sec-usable', DATA.usable);
  renderList('#sec-unusable', DATA.unusable);
  $('#cnt-usable').textContent = DATA.usable.length;
  $('#cnt-unusable').textContent = DATA.unusable.length;
  renderStats(); renderMachines(); renderFuture();
  applyFilter(); syncExpandAllBtn(); setupNavObserver(); updateBatchBar();
}

const addBuilderInput = document.getElementById('add-builder');
const builderPresetsEl = document.getElementById('builder-presets');
function updateBuilderPresets(){ if (!builderPresetsEl) return; builderPresetsEl.querySelectorAll('.builder-preset').forEach(btn => btn.classList.toggle('active', addBuilderInput.value.trim() === btn.dataset.preset)); }
if (builderPresetsEl){
  builderPresetsEl.addEventListener('click', e => { const btn = e.target.closest('.builder-preset'); if (!btn) return; addBuilderInput.value = btn.dataset.preset; updateBuilderPresets(); addBuilderInput.focus(); });
  addBuilderInput.addEventListener('input', updateBuilderPresets);
}

const batchBar = document.getElementById('batch-bar');
const batchCountNum = document.getElementById('batch-count-num');
const btnSelectMode = document.getElementById('btn-select-mode');
const batchProgressEl = document.getElementById('batch-progress');
const batchProgressFill = document.getElementById('batch-progress-fill');
const batchProgressText = document.getElementById('batch-progress-text');

function updateBatchBar(){ if (!batchBar) return; batchCountNum.textContent = selectedIds.size; batchBar.classList.toggle('show', selectMode && selectedIds.size > 0); }
function setSelectMode(on){ selectMode = on; if (!on) selectedIds.clear(); document.body.classList.toggle('select-mode', on); if (btnSelectMode) btnSelectMode.classList.toggle('primary', on); renderAll(); toast(on ? t('toastSelectModeOn') : t('toastSelectModeOff')); }
function showBatchProgress(i, n){ batchProgressEl.classList.add('show'); batchProgressFill.style.width = (n > 0 ? (i / n) * 100 : 0) + '%'; batchProgressText.textContent = tFmt('batchApplying', { i, n }); }
function hideBatchProgress(){ batchProgressEl.classList.remove('show'); batchProgressFill.style.width = '0'; batchProgressText.textContent = ''; }
btnSelectMode.addEventListener('click', () => setSelectMode(!selectMode));
document.getElementById('batch-select-all').addEventListener('click', () => { document.querySelectorAll('.lm').forEach(el => { if (el.style.display === 'none') return; const id = Number(el.dataset.id); if (id) selectedIds.add(id); }); renderAll(); });
document.getElementById('batch-clear').addEventListener('click', () => { selectedIds.clear(); renderAll(); });
document.addEventListener('change', e => { if (!e.target.classList.contains('lm-check')) return; const id = Number(e.target.dataset.lmId); if (!id) return; if (e.target.checked) selectedIds.add(id); else selectedIds.delete(id); const card = e.target.closest('.lm'); if (card) card.classList.toggle('selected', e.target.checked); updateBatchBar(); });
document.getElementById('batch-delete').addEventListener('click', async () => {
  const ids = [...selectedIds]; if (ids.length === 0) return;
  if (!confirm(tFmt('batchDeleteConfirm', { n: ids.length }))) return;
  let ok = 0, fail = 0;
  for (let i = 0; i < ids.length; i++){
    showBatchProgress(i + 1, ids.length);
    try { const res = await fetch(`${API_BASE}/api/landmarks/${ids[i]}`, { method: 'DELETE' }); if (res.ok) ok++; else fail++; } catch (_){ fail++; }
  }
  hideBatchProgress();
  toast(tFmt('batchDeleted', { n: ok }));
  selectedIds.clear(); await loadData();
});

const batchModal = document.getElementById('batch-modal');
const batchModalBackdrop = document.getElementById('batch-modal-backdrop');
const batchModalClose = document.getElementById('batch-modal-close');
const batchModalCancel = document.getElementById('batch-modal-cancel');
const batchModalConfirm = document.getElementById('batch-modal-confirm');
const batchEditCount = document.getElementById('batch-edit-count');
const batchStatusSel = document.getElementById('batch-status');
const batchDimSel = document.getElementById('batch-dim');
const batchBuilderInput = document.getElementById('batch-builder');
const batchBuilderPresets = document.getElementById('batch-builder-presets');
const batchAddTagsEl = document.getElementById('batch-add-tags');
const batchRemoveTagsEl = document.getElementById('batch-remove-tags');

function buildBatchTagGrids(){
  const tagList = Object.keys(TAG_META);
  batchAddTagsEl.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
  batchRemoveTagsEl.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
  bindBatchTagGrid(batchAddTagsEl, batchAddTags, batchRemoveTags);
  bindBatchTagGrid(batchRemoveTagsEl, batchRemoveTags, batchAddTags);
}
function bindBatchTagGrid(el, ownSet, otherSet){
  el.addEventListener('click', e => {
    const chip = e.target.closest('.tag-chip'); if (!chip) return;
    const tag = chip.dataset.tag;
    if (tag === '低价' && el === batchAddTagsEl){ if (!batchAddTags.has('交易')){ toast(curLang === 'zh' ? '请先勾选"交易"' : 'Select "Trade" first'); return; } }
    if (ownSet.has(tag)) ownSet.delete(tag);
    else { ownSet.add(tag); otherSet.delete(tag); }
    updateBatchTagChips();
  });
}
function updateBatchTagChips(){
  batchAddTagsEl.querySelectorAll('.tag-chip').forEach(c => c.classList.toggle('active', batchAddTags.has(c.dataset.tag)));
  batchRemoveTagsEl.querySelectorAll('.tag-chip').forEach(c => c.classList.toggle('active', batchRemoveTags.has(c.dataset.tag)));
}
function openBatchModal(){
  if (selectedIds.size === 0) return;
  batchEditCount.textContent = selectedIds.size;
  batchStatusSel.value = ''; batchDimSel.value = ''; batchBuilderInput.value = '';
  batchAddTags.clear(); batchRemoveTags.clear();
  buildBatchTagGrids(); updateBatchTagChips(); updateBatchBuilderPresets();
  batchModal.classList.add('open'); batchModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeBatchModal(){ batchModal.classList.remove('open'); batchModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
function updateBatchBuilderPresets(){ batchBuilderPresets.querySelectorAll('.builder-preset').forEach(btn => { if (btn.dataset.preset === '__clear__') return; btn.classList.toggle('active', batchBuilderInput.value.trim() === btn.dataset.preset); }); }
batchBuilderPresets.addEventListener('click', e => { const btn = e.target.closest('.builder-preset'); if (!btn) return; if (btn.dataset.preset === '__clear__'){ batchBuilderInput.value = ''; updateBatchBuilderPresets(); return; } batchBuilderInput.value = btn.dataset.preset; updateBatchBuilderPresets(); });
batchBuilderInput.addEventListener('input', updateBatchBuilderPresets);

batchModalConfirm.addEventListener('click', async () => {
  const newStatus = batchStatusSel.value, newDim = batchDimSel.value, newBuilder = batchBuilderInput.value.trim();
  const hasChange = newStatus || newDim || newBuilder || batchAddTags.size > 0 || batchRemoveTags.size > 0;
  if (!hasChange){ toast(t('batchNoChange')); return; }
  const ids = [...selectedIds];
  let ok = 0, fail = 0;
  const origHtml = batchModalConfirm.innerHTML;
  batchModalConfirm.disabled = true; batchModalClose.disabled = true; batchModalCancel.disabled = true;
  const all = [...DATA.usable, ...DATA.unusable, ...DATA.future];
  for (let i = 0; i < ids.length; i++){
    showBatchProgress(i + 1, ids.length);
    const id = ids[i]; const lm = all.find(x => x.id === id);
    if (!lm){ fail++; continue; }
    const newTagsSet = new Set(sanitizeTags(lm.tags));
    batchAddTags.forEach(tag => newTagsSet.add(tag));
    batchRemoveTags.forEach(tag => newTagsSet.delete(tag));
    if (!newTagsSet.has('交易')) newTagsSet.delete('低价');
    const body = { name_zh: lm.name.zh, name_en: lm.name.en || '', builder: newBuilder || lm.builder || '', dimension: newDim || lm.dim, category: newStatus || lm.category || 'usable', tags: [...newTagsSet], note_zh: lm.note ? (lm.note.zh || '') : '', note_en: lm.note ? (lm.note.en || '') : '', x: lm.x, y: lm.y, z: lm.z, children: lm.children || [], rate_zh: lm.rate ? (lm.rate.zh || '') : '', rate_en: lm.rate ? (lm.rate.en || '') : '', products_zh: lm.products ? (lm.products.zh || []) : [], products_en: lm.products ? (lm.products.en || []) : [] };
    try { const res = await fetch(`${API_BASE}/api/landmarks/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }); if (res.ok) ok++; else fail++; } catch (_){ fail++; }
  }
  batchModalConfirm.disabled = false; batchModalClose.disabled = false; batchModalCancel.disabled = false;
  batchModalConfirm.innerHTML = origHtml;
  hideBatchProgress();
  toast(tFmt('batchUpdated', { n: ok }));
  selectedIds.clear(); closeBatchModal(); await loadData();
});
document.getElementById('batch-edit').addEventListener('click', openBatchModal);
batchModalClose.addEventListener('click', closeBatchModal);
batchModalBackdrop.addEventListener('click', closeBatchModal);
batchModalCancel.addEventListener('click', closeBatchModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && batchModal.classList.contains('open')) closeBatchModal(); });

function nowStr(){ const d = new Date(); const p = n => String(n).padStart(2,'0'); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`; }
function fileBase(){ const d = new Date(); const p = n => String(n).padStart(2,'0'); return (curLang === 'zh' ? '66QN服务器地标坐标总览' : '66QN-Server-Landmarks') + '-' + `${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}`; }
const TAG_DESC = { zh:{生电:'红石/自动化机器',交易:'村民交易点',农场:'农牧渔场',遗留:'旧地点',低价:'低价附魔',已毁:'已损坏'}, en:{生电:'Redstone/automation',交易:'Villager trade',农场:'Farming',遗留:'Legacy',低价:'Cheap',已毁:'Ruined'} };

function buildTxt(){
  const L = []; const H = '='.repeat(64), T = '-'.repeat(64);
  L.push(H); L.push('   ' + t('dTitle')); L.push(H); L.push('');
  L.push('【' + t('dBasicInfo') + '】');
  L.push('  ' + t('dServer') + '：66QN'); L.push('  ' + t('dVersion') + '：Minecraft Java 26.2');
  L.push('  ' + t('dAuthor') + '：robot003'); L.push('  ' + t('dExportTime') + '：' + nowStr()); L.push('');
  L.push('【' + t('dTagLegend') + '】');
  Object.keys(TAG_META).forEach(tag => L.push('  [' + tagLabel(tag) + '] ' + ((TAG_DESC[curLang]||TAG_DESC.zh)[tag] || '')));
  L.push('');
  const txtLM = l => {
    const out = [];
    out.push('◆ ' + pick(l.name) + '  （' + dimLabel(l.dim) + '）');
    if (l.builder) out.push('    ' + t('dBuilder') + '：' + l.builder);
    const tags = (l.tags||[]).map(tagLabel).join(' · ');
    const note = l.note ? pick(l.note) : '';
    if (l.children && l.children.length){
      if (tags) out.push('    ' + t('dTags') + '：' + tags);
      if (note) out.push('    ' + t('dNote') + '：' + note);
      if (pick(l.rate)) out.push('    ' + t('dRate') + '：' + pick(l.rate));
      const prod = (curLang==='zh'?l.products.zh:l.products.en)||[];
      if (prod.length) out.push('    ' + t('dProducts') + '：' + prod.join('、'));
      out.push('    ' + t('dCoord') + '：');
      l.children.forEach((c, i) => out.push((i === l.children.length-1 ? '      └─ ' : '      ├─ ') + roleLabel(c.label) + '：' + c.x + ' ' + c.y + ' ' + c.z));
    } else {
      out.push('    ' + t('dCoord') + '：' + l.x + ' ' + l.y + ' ' + l.z);
      if (tags) out.push('    ' + t('dTags') + '：' + tags);
      if (note) out.push('    ' + t('dNote') + '：' + note);
    }
    out.push(''); return out.join('\n');
  };
  L.push(T); L.push('【' + t('dAvailable') + '】（' + DATA.usable.length + '）'); L.push(T); L.push('');
  DATA.usable.forEach(l => L.push(txtLM(l)));
  L.push(T); L.push('【' + t('dUnavailable') + '】（' + DATA.unusable.length + '）'); L.push(T); L.push('');
  DATA.unusable.forEach(l => L.push(txtLM(l)));
  L.push(T); L.push('【' + t('dTechTitle') + '】'); L.push(T); L.push('');
  DATA.usable.filter(l => catsOf(l.tags).includes('tech')).forEach(m => {
    L.push('◆ ' + pick(m.name) + '  [' + (m.tags||[]).map(tagLabel).join(' · ') + ']');
    if (m.builder) L.push('    ' + t('dBuilder') + '：' + m.builder);
    L.push('    ' + t('dCoord') + '：');
    if (m.children && m.children.length) m.children.forEach(c => L.push('      · ' + c.x + ' ' + c.y + ' ' + c.z + '  (' + roleLabel(c.label) + ' · ' + dimLabel(m.dim) + ')'));
    else L.push('      · ' + m.x + ' ' + m.y + ' ' + m.z + '  (' + dimLabel(m.dim) + ')');
    if (pick(m.rate)) L.push('    ' + t('dRate') + '：' + pick(m.rate));
    if (m.note) L.push('    ' + t('dNote') + '：' + pick(m.note));
    const prod = (curLang==='zh'?m.products.zh:m.products.en)||[];
    if (prod.length) L.push('    ' + t('dProducts') + '：' + prod.join('、'));
    L.push('');
  });
  L.push(T); L.push('【' + t('dFuture') + '】（' + DATA.future.length + '）'); L.push(T); L.push('');
  DATA.future.forEach(f => {
    const tags = (f.tags||[]).map(tagLabel).join(' · ');
    let line = '  · ' + pick(f.name);
    if (tags) line += '  [' + tags + ']';
    if (f.builder) line += '  ' + t('dBuilder') + '：' + f.builder;
    if (f.note) line += '  (' + pick(f.note) + ')';
    L.push(line);
  });
  L.push(''); L.push(H); L.push('  ' + t('footerAuthor')); L.push(H);
  return L.join('\n');
}
function buildMarkdown(){
  const L = [];
  L.push('# ' + t('dTitle') + '\n');
  L.push('## ' + t('dBasicInfo') + '\n');
  L.push('- **' + t('dServer') + '**：66QN');
  L.push('- **' + t('dVersion') + '**：Minecraft Java 26.2');
  L.push('- **' + t('dAuthor') + '**：robot003');
  L.push('- **' + t('dExportTime') + '**：' + nowStr() + '\n');
  L.push('## ' + t('dTagLegend') + '\n');
  Object.keys(TAG_META).forEach(tag => L.push('- **' + tagLabel(tag) + '**：' + ((TAG_DESC[curLang]||TAG_DESC.zh)[tag] || '')));
  L.push('');
  const mdLM = l => {
    const out = [];
    out.push('### ' + pick(l.name)); out.push('');
    out.push('- **' + t('dDimension') + '**：' + dimLabel(l.dim));
    if (l.builder) out.push('- **' + t('dBuilder') + '**：' + l.builder);
    if (l.children && l.children.length){
      if (l.tags && l.tags.length) out.push('- **' + t('dTags') + '**：' + l.tags.map(tagLabel).join(' / '));
      if (pick(l.rate)) out.push('- **' + t('dRate') + '**：' + pick(l.rate));
      const prod = (curLang==='zh'?l.products.zh:l.products.en)||[];
      if (prod.length) out.push('- **' + t('dProducts') + '**：' + prod.join('、'));
      if (l.note) out.push('- **' + t('dNote') + '**：' + pick(l.note));
      out.push('- **' + t('dCoord') + '**：');
      l.children.forEach(c => out.push('  - ' + roleLabel(c.label) + '：`' + c.x + ' ' + c.y + ' ' + c.z + '`'));
    } else {
      out.push('- **' + t('dCoord') + '**：`' + l.x + ' ' + l.y + ' ' + l.z + '`');
      if (l.tags && l.tags.length) out.push('- **' + t('dTags') + '**：' + l.tags.map(tagLabel).join(' / '));
      if (l.note) out.push('- **' + t('dNote') + '**：' + pick(l.note));
    }
    out.push(''); return out.join('\n');
  };
  L.push('## ' + t('dAvailable') + '（' + DATA.usable.length + '）\n');
  DATA.usable.forEach(l => L.push(mdLM(l)));
  L.push('## ' + t('dUnavailable') + '（' + DATA.unusable.length + '）\n');
  DATA.unusable.forEach(l => L.push(mdLM(l)));
  L.push('## ' + t('dTechTitle') + '\n');
  DATA.usable.filter(l => catsOf(l.tags).includes('tech')).forEach(m => {
    L.push('### ' + pick(m.name) + '  [' + (m.tags||[]).map(tagLabel).join(' / ') + ']'); L.push('');
    if (m.builder) L.push('- **' + t('dBuilder') + '**：' + m.builder);
    const coordsStr = [];
    if (m.children && m.children.length) m.children.forEach(c => coordsStr.push('`' + c.x + ' ' + c.y + ' ' + c.z + '`（' + roleLabel(c.label) + '）'));
    else coordsStr.push('`' + m.x + ' ' + m.y + ' ' + m.z + '`（' + dimLabel(m.dim) + '）');
    L.push('- **' + t('dCoord') + '**：' + coordsStr.join(' / '));
    if (pick(m.rate)) L.push('- **' + t('dRate') + '**：' + pick(m.rate));
    const prod = (curLang==='zh'?m.products.zh:m.products.en)||[];
    if (prod.length) L.push('- **' + t('dProducts') + '**：' + prod.join('、'));
    if (m.note) L.push('- **' + t('dNote') + '**：' + pick(m.note));
    L.push('');
  });
  L.push('## ' + t('dFuture') + '（' + DATA.future.length + '）\n');
  DATA.future.forEach(f => {
    const tags = (f.tags||[]).map(tagLabel).join(' / ');
    let line = '- ' + pick(f.name);
    if (tags) line += '  `' + tags + '`';
    if (f.builder) line += '  **' + t('dBuilder') + '**：' + f.builder;
    if (f.note) line += '  _' + pick(f.note) + '_';
    L.push(line);
  });
  L.push(''); L.push('---'); L.push(t('footerAuthor'));
  return L.join('\n');
}
function csvEsc(v){ const s = String(v == null ? '' : v); return /[",\n\r]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; }
function csvRow(arr){ return arr.map(csvEsc).join(','); }
function buildCsv(){
  const rows = [];
  rows.push(csvRow([t('dName'), t('dStatus'), t('dDimension'), t('dX'), t('dY'), t('dZ'), t('dPoint'), t('dTags'), t('dBuilder'), t('dRate'), t('dProducts'), t('dNote')]));
  const statusLabel = c => (CAT_LABEL[curLang]||CAT_LABEL.zh)[c] || c;
  DATA.usable.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    const rate = pick(l.rate);
    const prods = (curLang==='zh'?l.products.zh:l.products.en)||[];
    const prodsStr = prods.join(' / ');
    if (l.children && l.children.length) l.children.forEach(c => rows.push(csvRow([pick(l.name), statusLabel('usable'), dimLabel(l.dim), c.x, c.y, c.z, roleLabel(c.label), tags, l.builder || '', rate, prodsStr, note])));
    else rows.push(csvRow([pick(l.name), statusLabel('usable'), dimLabel(l.dim), l.x, l.y, l.z, '', tags, l.builder || '', rate, prodsStr, note]));
  });
  DATA.unusable.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    rows.push(csvRow([pick(l.name), statusLabel('unusable'), dimLabel(l.dim), l.x, l.y, l.z, '', tags, l.builder || '', '', '', note]));
  });
  DATA.future.forEach(l => {
    const tags = (l.tags||[]).map(tagLabel).join(' / ');
    const note = l.note ? pick(l.note) : '';
    rows.push(csvRow([pick(l.name), statusLabel('future'), dimLabel(l.dim), '', '', '', '', tags, l.builder || '', '', '', note]));
  });
  return '\uFEFF' + rows.join('\r\n');
}
function downloadBlob(content, mime, filename){ const blob = new Blob([content], { type: mime }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); }
function downloadTxt(){ downloadBlob(buildTxt(), 'text/plain;charset=utf-8', fileBase() + '.txt'); toast(t('toastDlTxt')); }
function downloadMarkdown(){ downloadBlob(buildMarkdown(), 'text/markdown;charset=utf-8', fileBase() + '.md'); toast(t('toastDlMd')); }
function downloadCsv(){ downloadBlob(buildCsv(), 'text/csv;charset=utf-8', fileBase() + '.csv'); toast(t('toastDlCsv')); }

const importModal = document.getElementById('import-modal');
const importBackdrop = document.getElementById('import-modal-backdrop');
const importCloseBtn = document.getElementById('import-modal-close');
const importCancelBtn = document.getElementById('import-cancel');
const importSubmitBtn = document.getElementById('import-submit');
const importText = document.getElementById('import-text');
const importHint = document.getElementById('import-hint');
const importPreview = document.getElementById('import-preview');
const importFile = document.getElementById('import-file');
const importFileBtn = document.getElementById('import-file-btn');
const importFilename = document.getElementById('import-filename');
const importFormatHelp = document.getElementById('import-format-help');

let importFormat = 'csv', importParsed = [], importRunning = false, importDebounce = null;
let importMergeInfo = { merged: 0, ignored: 0 };

function openImportModal(){ importModal.classList.add('open'); importModal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; resetImportUI(); }
function closeImportModal(){ if (importRunning) return; importModal.classList.remove('open'); importModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
function resetImportUI(){ importText.value = ''; importFilename.textContent = ''; importHint.style.display = 'none'; importHint.className = 'import-hint'; importPreview.classList.remove('show'); importPreview.innerHTML = ''; importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; importSubmitBtn.disabled = false; importSubmitBtn.innerHTML = ICON.check + '<span>' + t('importSubmit') + '</span>'; switchImportFormat('csv'); }
function switchImportFormat(fmt){ importFormat = fmt; document.querySelectorAll('.import-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.format === fmt)); updateImportFormatHelp(); tryParseImport(); }
function updateImportFormatHelp(){
  if (!importFormatHelp) return;
  const allowed = Object.keys(TAG_META).join(' / ');
  if (importFormat === 'csv'){
    importFormatHelp.textContent = curLang === 'zh' ? 'CSV 列：名称,状态,维度,X,Y,Z,点位,标签,建造者,效率,产物,说明\n标签和产物用 "/" 分隔。建造者：玩家ID / 自然生成 / 多人 / 未知\n允许标签：' + allowed + '（其他忽略）\n同名地标自动合并。' : 'CSV cols: Name,Status,Dimension,X,Y,Z,Point,Tags,Builder,Rate,Products,Note\nSeparate with "/". Builder: player ID / Natural / Multi-person / Unknown\nAllowed tags: ' + allowed + ' (others ignored)\nSame-name items merged.';
  } else {
    importFormatHelp.textContent = curLang === 'zh' ? 'JSON：[ { "name_zh":"...", "dimension":"overworld", "x":0, "y":64, "z":0, "tags":["遗留"], "builder":"Steve" } ]\n允许标签：' + allowed + '（其他忽略）\n同名地标自动合并。' : 'JSON: [ { "name_zh":"...", "dimension":"overworld", "x":0, "y":64, "z":0, "tags":["Legacy"], "builder":"Steve" } ]\nAllowed tags: ' + allowed + '\nSame-name items merged.';
  }
}
document.querySelectorAll('.import-tab').forEach(tab => tab.addEventListener('click', () => switchImportFormat(tab.dataset.format)));
importFileBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', e => { const file = e.target.files && e.target.files[0]; if (!file) return; importFilename.textContent = file.name + ' (' + Math.round(file.size/1024) + ' KB)'; const reader = new FileReader(); reader.onload = ev => { importText.value = ev.target.result; if (/\.json$/i.test(file.name)) switchImportFormat('json'); else if (/\.csv$/i.test(file.name)) switchImportFormat('csv'); else tryParseImport(); }; reader.readAsText(file, 'UTF-8'); e.target.value = ''; });
importText.addEventListener('input', () => { clearTimeout(importDebounce); importDebounce = setTimeout(tryParseImport, 250); });

function parseCsvLine(line){ const result = []; let cur = ''; let inQ = false; for (let i = 0; i < line.length; i++){ const ch = line[i]; if (inQ){ if (ch === '"'){ if (line[i+1] === '"'){ cur += '"'; i++; } else inQ = false; } else cur += ch; } else { if (ch === '"') inQ = true; else if (ch === ','){ result.push(cur); cur = ''; } else cur += ch; } } result.push(cur); return result; }
function parseCsvData(text){
  const lines = text.split(/\r?\n/).filter(l => l.trim()); if (lines.length < 2) return { items: [], ignoredCount: 0 };
  const items = []; let ignoredCount = 0;
  for (let i = 1; i < lines.length; i++){
    const cols = parseCsvLine(lines[i]); if (cols.length < 4) continue;
    const [name, status, dim, x, y, z, point, tags, builder, rate, products, note] = cols;
    if (!name || !name.trim()) continue;
    const dimKey = DIM_FROM_LABEL[dim] || DIM_FROM_LABEL[(dim||'').toLowerCase()] || 'overworld';
    const catKey = CAT_FROM_LABEL[status] || CAT_FROM_LABEL[(status||'').toLowerCase()] || 'usable';
    const rawTags = (tags || '').split(/\s*[\/、,，·]\s*/).map(s => s.trim()).filter(Boolean);
    const mapped = rawTags.map(x => TAG_FROM_LABEL[x] || x);
    const validTags = mapped.filter(x => TAG_META[x]);
    ignoredCount += (mapped.length - validTags.length);
    if (!validTags.includes('交易')) { const idx = validTags.indexOf('低价'); if (idx >= 0) validTags.splice(idx, 1); }
    const prodsArr = (products || '').split(/\s*[\/、,，]\s*/).map(s => s.trim()).filter(Boolean);
    const children = [];
    if (point && point.trim()) children.push({ label: ROLE_FROM_LABEL[point] || point, x: Number(x) || 0, y: Number(y) || 0, z: Number(z) || 0 });
    items.push({ name_zh: name.trim(), name_en: '', dimension: dimKey, x: Number(x) || 0, y: Number(y) || 0, z: Number(z) || 0, category: catKey, tags: validTags, builder: (builder || '').trim(), note_zh: (note || '').trim(), note_en: '', rate_zh: (rate || '').trim(), rate_en: '', products_zh: prodsArr, products_en: [], children });
  }
  return { items, ignoredCount };
}
function parseJsonData(text){
  try { const data = JSON.parse(text); if (!Array.isArray(data)) return null;
    const items = []; let ignoredCount = 0;
    data.forEach(item => {
      const nameZh = item.name_zh || (item.name && item.name.zh) || ''; if (!nameZh) return;
      const rawTags = Array.isArray(item.tags) ? item.tags : [];
      const mapped = rawTags.map(x => TAG_FROM_LABEL[x] || x);
      const validTags = mapped.filter(x => TAG_META[x]);
      ignoredCount += (mapped.length - validTags.length);
      if (!validTags.includes('交易')) { const idx = validTags.indexOf('低价'); if (idx >= 0) validTags.splice(idx, 1); }
      items.push({ name_zh: nameZh, name_en: item.name_en || (item.name && item.name.en) || '', dimension: item.dimension || item.dim || 'overworld', x: Number(item.x) || 0, y: Number(item.y) || 0, z: Number(item.z) || 0, category: item.category || 'usable', tags: validTags, builder: item.builder || '', note_zh: item.note_zh || (item.note && item.note.zh) || '', note_en: item.note_en || (item.note && item.note.en) || '', rate_zh: item.rate_zh || (item.rate && item.rate.zh) || '', rate_en: item.rate_en || (item.rate && item.rate.en) || '', products_zh: Array.isArray(item.products_zh) ? item.products_zh : ((item.products && item.products.zh) || []), products_en: Array.isArray(item.products_en) ? item.products_en : ((item.products && item.products.en) || []), children: Array.isArray(item.children) ? item.children : [] });
    });
    return { items, ignoredCount };
  } catch (_){ return null; }
}
function mergeDuplicates(items){
  const groups = new Map(); const order = [];
  for (const item of items){ const key = (item.name_zh || '').trim(); if (!key) continue; if (!groups.has(key)){ groups.set(key, []); order.push(key); } groups.get(key).push(item); }
  const merged = []; let mergedGroups = 0;
  for (const key of order){
    const group = groups.get(key);
    if (group.length === 1){ merged.push(group[0]); continue; }
    mergedGroups++;
    const first = JSON.parse(JSON.stringify(group[0]));
    const allTags = new Set(); const allProducts = new Set(); const allChildren = []; let firstNoteSet = false;
    (first.tags || []).forEach(t => allTags.add(t));
    (first.products_zh || []).forEach(p => allProducts.add(p));
    if (first.children && first.children.length) allChildren.push(...first.children);
    else if (first.x !== undefined) allChildren.push({ label: '点位', x: first.x, y: first.y, z: first.z });
    for (let i = 1; i < group.length; i++){
      const item = group[i];
      (item.tags || []).forEach(t => allTags.add(t));
      (item.products_zh || []).forEach(p => allProducts.add(p));
      if (item.children && item.children.length) allChildren.push(...item.children);
      else if (item.x !== undefined) allChildren.push({ label: '点位', x: item.x, y: item.y, z: item.z });
      if (item.note_zh && item.note_zh.trim()){ if (firstNoteSet || (first.note_zh && first.note_zh.trim() && first.note_zh !== item.note_zh)){ if (first.note_zh !== item.note_zh) first.note_zh = (first.note_zh || '') + (first.note_zh ? ' / ' : '') + item.note_zh; } else first.note_zh = item.note_zh; firstNoteSet = true; }
      if (item.builder && !first.builder) first.builder = item.builder;
    }
    first.tags = [...allTags]; first.products_zh = [...allProducts];
    if (!first.tags.includes('交易')) { const idx = first.tags.indexOf('低价'); if (idx >= 0) first.tags.splice(idx, 1); }
    if (allChildren.length > 0){ first.children = allChildren; first.x = 0; first.y = 0; first.z = 0; }
    merged.push(first);
  }
  return { merged, mergedGroups };
}
function tryParseImport(){
  const text = importText.value.trim();
  if (!text){ importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; importHint.style.display = 'none'; importPreview.classList.remove('show'); importPreview.innerHTML = ''; return; }
  let result, err = false;
  if (importFormat === 'csv') result = parseCsvData(text);
  else { result = parseJsonData(text); if (result === null) err = true; }
  if (err){ importHint.style.display = ''; importHint.className = 'import-hint error'; importHint.textContent = t('importParseErr'); importPreview.classList.remove('show'); importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; return; }
  const items = result.items; const ignored = result.ignoredCount || 0;
  if (items.length === 0){ importHint.style.display = ''; importHint.className = 'import-hint warn'; importHint.textContent = t('importParseEmpty'); importPreview.classList.remove('show'); importParsed = []; importMergeInfo = { merged: 0, ignored: 0 }; return; }
  const original = items.length;
  const { merged, mergedGroups } = mergeDuplicates(items);
  importParsed = merged; importMergeInfo = { merged: mergedGroups, ignored };
  importHint.style.display = ''; importHint.className = 'import-hint success';
  if (mergedGroups > 0 && ignored > 0) importHint.textContent = tFmt('importParseMergedAndIgnored', { n: original, m: mergedGroups, i: ignored, f: merged.length });
  else if (mergedGroups > 0) importHint.textContent = tFmt('importParseMerged', { n: original, m: mergedGroups, f: merged.length });
  else if (ignored > 0) importHint.textContent = tFmt('importParseIgnored', { n: original, i: ignored });
  else importHint.textContent = tFmt('importParseOk', { n: original });
  renderImportPreview();
}
function renderImportPreview(){
  const first = importParsed.slice(0, 8);
  const items = first.map(item => {
    const coord = item.children && item.children.length ? `${item.children.length} ${t('childPoints')}` : `${item.x} ${item.y} ${item.z}`;
    return `<div class="import-preview-item"><span class="import-preview-name">${escapeHtml(item.name_zh)}</span><span class="import-preview-meta">${dimLabel(item.dimension)} · ${coord}</span></div>`;
  }).join('');
  const more = importParsed.length > 8 ? `<div class="import-preview-more">…… ${importParsed.length} 条</div>` : '';
  let badges = '';
  if (importMergeInfo.merged > 0) badges += `<span class="import-merge-badge">${ICON.layers}${importMergeInfo.merged} 组合并</span>`;
  if (importMergeInfo.ignored > 0) badges += `<span class="import-ignore-badge">${ICON.info}忽略 ${importMergeInfo.ignored} 未知标签</span>`;
  importPreview.innerHTML = `<div class="import-preview-title">${t('importPreviewTitle')}${badges}</div>${items}${more}`;
  importPreview.classList.add('show');
}
importSubmitBtn.addEventListener('click', async () => {
  if (importRunning) return;
  if (importParsed.length === 0){ toast(t('importEmpty')); return; }
  if (!confirm(tFmt('importConfirm', { n: importParsed.length }))) return;
  importRunning = true; importSubmitBtn.disabled = true; importCancelBtn.disabled = true; importCloseBtn.disabled = true;
  let success = 0, failed = 0;
  for (let i = 0; i < importParsed.length; i++){
    importSubmitBtn.innerHTML = '<span>' + tFmt('importProgress', { i: i+1, n: importParsed.length }) + '</span>';
    try { const res = await fetch(`${API_BASE}/api/landmarks`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(importParsed[i]) }); if (res.ok) success++; else failed++; } catch (_){ failed++; }
  }
  importRunning = false; importSubmitBtn.disabled = false; importCancelBtn.disabled = false; importCloseBtn.disabled = false;
  importSubmitBtn.innerHTML = ICON.check + '<span>' + t('importSubmit') + '</span>';
  if (failed > 0) toast(tFmt('importDoneWithFail', { s: success, f: failed })); else toast(tFmt('importDone', { s: success }));
  if (success > 0){ closeImportModal(); await loadData(); }
});
document.getElementById('btn-import').addEventListener('click', openImportModal);
importCloseBtn.addEventListener('click', closeImportModal);
importBackdrop.addEventListener('click', closeImportModal);
importCancelBtn.addEventListener('click', closeImportModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && importModal.classList.contains('open')) closeImportModal(); });

const sideNav = document.getElementById('side-nav');
const sideNavFab = document.getElementById('side-nav-fab');
const sideNavBackdrop = document.getElementById('side-nav-backdrop');
const sideNavCollapse = document.getElementById('side-nav-collapse');
const NAV_TARGETS = ['anchor-hero','anchor-usable','anchor-unusable','anchor-machines','anchor-future','anchor-links'];
let navCollapsed = false;
try { navCollapsed = localStorage.getItem('sideNavCollapsed') === '1'; } catch(_) {}
if (navCollapsed) sideNav.classList.add('collapsed');
sideNavCollapse && sideNavCollapse.addEventListener('click', () => { navCollapsed = !navCollapsed; sideNav.classList.toggle('collapsed', navCollapsed); try { localStorage.setItem('sideNavCollapsed', navCollapsed ? '1' : '0'); } catch(_){} });
function openMobileNav(){ sideNav.classList.add('open'); sideNavBackdrop.classList.add('show'); sideNavFab && sideNavFab.setAttribute('aria-expanded','true'); document.body.style.overflow = 'hidden'; }
function closeMobileNav(){ sideNav.classList.remove('open'); sideNavBackdrop.classList.remove('show'); sideNavFab && sideNavFab.setAttribute('aria-expanded','false'); document.body.style.overflow = ''; }
sideNavFab && sideNavFab.addEventListener('click', e => { e.stopPropagation(); if (sideNav.classList.contains('open')) closeMobileNav(); else openMobileNav(); });
sideNavBackdrop && sideNavBackdrop.addEventListener('click', closeMobileNav);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && sideNav.classList.contains('open')) closeMobileNav(); });
document.querySelectorAll('.side-nav-link').forEach(link => { link.addEventListener('click', e => { e.preventDefault(); const id = link.dataset.navTarget; const target = document.getElementById(id); if (!target) return; target.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveNav(id); if (window.innerWidth <= 1180) closeMobileNav(); }); });
function setActiveNav(id){ document.querySelectorAll('.side-nav-link').forEach(a => a.classList.toggle('active', a.dataset.navTarget === id)); }
let navObserver = null;
function setupNavObserver(){ if (navObserver) navObserver.disconnect(); const targets = NAV_TARGETS.map(id => document.getElementById(id)).filter(Boolean); if (!targets.length) return; navObserver = new IntersectionObserver(entries => { const visible = entries.filter(en => en.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top); if (visible.length > 0) setActiveNav(visible[0].target.id); }, { rootMargin: '-120px 0px -55% 0px', threshold: 0 }); targets.forEach(t => navObserver.observe(t)); }

const downloadWrap = $('#download-wrap');
const btnDownload = $('#btn-download');
const ddBackdrop = $('#dd-backdrop');
function openDownloadMenu(){ downloadWrap.classList.add('open'); btnDownload.setAttribute('aria-expanded','true'); if (document.body.classList.contains('is-mobile') || window.innerWidth <= 660) ddBackdrop.classList.add('show'); }
function closeDownloadMenu(){ downloadWrap.classList.remove('open'); btnDownload.setAttribute('aria-expanded','false'); ddBackdrop.classList.remove('show'); }
btnDownload.addEventListener('click', e => { e.stopPropagation(); if (downloadWrap.classList.contains('open')) closeDownloadMenu(); else openDownloadMenu(); });
ddBackdrop.addEventListener('click', closeDownloadMenu);
document.addEventListener('click', e => { if (!downloadWrap.classList.contains('open')) return; if (downloadWrap.contains(e.target)) return; closeDownloadMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && downloadWrap.classList.contains('open')){ closeDownloadMenu(); btnDownload.focus(); } });
$('#download-dropdown').addEventListener('click', e => { const item = e.target.closest('.dd-item'); if (!item) return; const fmt = item.dataset.format; closeDownloadMenu(); if (fmt === 'md') downloadMarkdown(); else if (fmt === 'txt') downloadTxt(); else if (fmt === 'csv') downloadCsv(); });

const copyModal = document.getElementById('copy-modal');
const copyModalBackdrop = document.getElementById('copy-modal-backdrop');
const copyModalClose = document.getElementById('copy-modal-close');
const copyOpBtn = document.getElementById('copy-op-btn');
const copyTpBtn = document.getElementById('copy-tp-btn');

function openCopyModal(opCmd, tpCmd){
  currentCopyCommands = { op: opCmd, tp: tpCmd };
  document.getElementById('copy-op-code').textContent = opCmd;
  document.getElementById('copy-tp-code').textContent = tpCmd;
  copyModal.classList.add('open');
  copyModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeCopyModal(){
  copyModal.classList.remove('open');
  copyModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

async function handleCopy(text, btnEl){
  const ok = await copyText(text);
  if (!ok){ toast(t('toastCopyFail')); return; }
  if (btnEl){
    const codeEl = btnEl.querySelector('.copy-option-code');
    const orig = codeEl.textContent;
    codeEl.innerHTML = `<span style="color:var(--accent)">${t('btnCopied')}</span>`;
    setTimeout(() => { codeEl.textContent = orig; closeCopyModal(); }, 800);
  }
  toast(t('toastCopied') + text);
}

copyOpBtn.addEventListener('click', () => handleCopy(currentCopyCommands.op, copyOpBtn));
copyTpBtn.addEventListener('click', () => handleCopy(currentCopyCommands.tp, copyTpBtn));
copyModalClose.addEventListener('click', closeCopyModal);
copyModalBackdrop.addEventListener('click', closeCopyModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && copyModal.classList.contains('open')) closeCopyModal(); });

document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-copy'); if (!btn) return;
  openCopyModal(btn.dataset.op, btn.dataset.tp);
});

document.addEventListener('click', async e => {
  const btn = e.target.closest('.btn-icon.delete'); if (!btn) return;
  e.stopPropagation(); e.preventDefault();
  const id = btn.dataset.deleteId; const name = btn.dataset.deleteName || '';
  if (!id) return;
  if (!confirm(t('confirmDelete').replace('{name}', name))) return;
  btn.disabled = true;
  try { const res = await fetch(`${API_BASE}/api/landmarks/${id}`, { method: 'DELETE' }); if (!res.ok) throw new Error(`HTTP ${res.status}`); toast(t('toastDeleted')); await loadData(); } catch (err){ toast(t('toastAddFail') + err.message); btn.disabled = false; }
});

const addModal = document.getElementById('add-modal');
const addForm = document.getElementById('add-form');
const addNameZh = document.getElementById('add-name-zh');
const addNameEn = document.getElementById('add-name-en');
const addBuilder = document.getElementById('add-builder');
const addDim = document.getElementById('add-dim');
const addCategory = document.getElementById('add-category');
const addX = document.getElementById('add-x');
const addY = document.getElementById('add-y');
const addZ = document.getElementById('add-z');
const addNote = document.getElementById('add-note');
const addRateZh = document.getElementById('add-rate-zh');
const addProductsZh = document.getElementById('add-products-zh');
const addTagPicker = document.getElementById('add-tag-picker');
const addModeSwitch = document.getElementById('add-mode-switch');
const addSingleCoords = document.getElementById('add-single-coords');
const addMultiCoords = document.getElementById('add-multi-coords');
const addLocationList = document.getElementById('add-location-list');
const addTechFields = document.getElementById('add-tech-fields');

function buildAddTagPicker(){
  const tagList = Object.keys(TAG_META);
  addTagPicker.innerHTML = tagList.map(tag => `<button type="button" class="tag-chip" data-tag="${tag}">${tagLabel(tag)}</button>`).join('');
}
addTagPicker.addEventListener('click', e => {
  const chip = e.target.closest('.tag-chip'); if (!chip) return;
  const tag = chip.dataset.tag;
  if (tag === '低价' && !selectedTags.includes('交易')){
    toast(curLang === 'zh' ? '请先勾选"交易"' : 'Select "Trade" first');
    return;
  }
  const idx = selectedTags.indexOf(tag);
  if (idx >= 0){
    selectedTags.splice(idx, 1);
    if (tag === '交易'){ const li = selectedTags.indexOf('低价'); if (li >= 0) selectedTags.splice(li, 1); }
  } else selectedTags.push(tag);
  updateTagChips();
});
function updateTagChips(){
  addTagPicker.querySelectorAll('.tag-chip').forEach(chip => {
    const tag = chip.dataset.tag;
    chip.classList.toggle('active', selectedTags.includes(tag));
    if (tag === '低价'){
      const disabled = !selectedTags.includes('交易');
      chip.disabled = disabled;
      chip.classList.toggle('disabled', disabled);
    }
  });
  const hasTech = selectedTags.includes('生电');
  addTechFields.style.display = hasTech ? '' : 'none';
}
addModeSwitch.addEventListener('click', e => {
  const btn = e.target.closest('.mode-btn'); if (!btn) return;
  coordMode = btn.dataset.mode; updateModeSwitch();
  addSingleCoords.style.display = coordMode === 'single' ? '' : 'none';
  addMultiCoords.style.display = coordMode === 'multi' ? '' : 'none';
  if (coordMode === 'multi' && addLocationList.children.length === 0) addLocationRow();
});
function updateModeSwitch(){ addModeSwitch.querySelectorAll('.mode-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === coordMode)); }
function addLocationRow(label, x, y, z){
  const row = document.createElement('div'); row.className = 'location-row';
  row.innerHTML = `<input class="form-input location-label" type="text" placeholder="标签" style="flex:0 0 100px"><input class="form-input location-x" type="number" placeholder="X" required><input class="form-input location-y" type="number" placeholder="Y" required><input class="form-input location-z" type="number" placeholder="Z" required><button type="button" class="btn-remove-location" title="删除">✕</button>`;
  if (label !== undefined) row.querySelector('.location-label').value = label || '';
  if (x !== undefined) row.querySelector('.location-x').value = x;
  if (y !== undefined) row.querySelector('.location-y').value = y;
  if (z !== undefined) row.querySelector('.location-z').value = z;
  row.querySelector('.btn-remove-location').addEventListener('click', () => row.remove());
  addLocationList.appendChild(row);
}
document.getElementById('btn-add-location').addEventListener('click', () => addLocationRow());

function openAddModal(){
  editingId = null;
  addModal.classList.add('open'); addModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  addForm.reset(); selectedTags = []; coordMode = 'single';
  buildAddTagPicker(); updateTagChips(); updateModeSwitch();
  addLocationList.innerHTML = '';
  addSingleCoords.style.display = ''; addMultiCoords.style.display = 'none';
  document.getElementById('add-modal-title-text').textContent = t('addTitle');
  updateBuilderPresets();
}
function openEditModal(lm){
  editingId = lm.id;
  addModal.classList.add('open'); addModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  addForm.reset();
  addNameZh.value = lm.name.zh || ''; addNameEn.value = lm.name.en || '';
  addBuilder.value = lm.builder || ''; addDim.value = lm.dim;
  addCategory.value = lm.category || 'usable';
  addNote.value = lm.note ? (lm.note.zh || '') : '';
  addRateZh.value = lm.rate ? (lm.rate.zh || '') : '';
  addProductsZh.value = lm.products && lm.products.zh ? lm.products.zh.join(', ') : '';
  selectedTags = sanitizeTags(lm.tags);
  buildAddTagPicker(); updateTagChips(); updateBuilderPresets();
  if (lm.children && lm.children.length){ coordMode = 'multi'; addLocationList.innerHTML = ''; lm.children.forEach(c => addLocationRow(c.label, c.x, c.y, c.z)); }
  else { coordMode = 'single'; addX.value = lm.x; addY.value = lm.y; addZ.value = lm.z; }
  updateModeSwitch();
  addSingleCoords.style.display = coordMode === 'single' ? '' : 'none';
  addMultiCoords.style.display = coordMode === 'multi' ? '' : 'none';
  document.getElementById('add-modal-title-text').textContent = t('addTitleEdit');
}
function closeAddModal(){ addModal.classList.remove('open'); addModal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; editingId = null; }

addForm.addEventListener('submit', async e => {
  e.preventDefault();
  if (!addNameZh.value.trim()){ addNameZh.focus(); return; }
  if (!addBuilder.value.trim()){ toast(t('errBuilder')); addBuilder.focus(); return; }
  const hasTech = selectedTags.includes('生电');
  if (hasTech){
    if (!addRateZh.value.trim()){ toast(t('errTechRate')); addRateZh.focus(); return; }
    if (!addProductsZh.value.trim()){ toast(t('errTechProducts')); addProductsZh.focus(); return; }
  }
  const submitBtn = document.getElementById('add-submit');
  const origHtml = submitBtn.innerHTML;
  submitBtn.disabled = true; submitBtn.textContent = t('btnSubmitting');
  try {
    const productsArr = addProductsZh.value.trim() ? addProductsZh.value.split(/[,，]/).map(s => s.trim()).filter(Boolean) : [];
    const body = { name_zh: addNameZh.value.trim(), name_en: addNameEn.value.trim(), builder: addBuilder.value.trim(), dimension: addDim.value, category: addCategory.value, tags: sanitizeTags(selectedTags), note_zh: addNote.value.trim(), x: coordMode === 'single' ? Number(addX.value) : 0, y: coordMode === 'single' ? Number(addY.value) : 0, z: coordMode === 'single' ? Number(addZ.value) : 0, children: [], rate_zh: hasTech ? addRateZh.value.trim() : '', rate_en: '', products_zh: hasTech ? productsArr : [], products_en: [] };
    if (coordMode === 'multi'){
      addLocationList.querySelectorAll('.location-row').forEach(row => {
        const label = row.querySelector('.location-label').value.trim();
        const x = Number(row.querySelector('.location-x').value); const y = Number(row.querySelector('.location-y').value); const z = Number(row.querySelector('.location-z').value);
        if (label || !isNaN(x)) body.children.push({ label: label || '点位', x, y, z });
      });
      if (body.children.length === 0){ toast(t('errNoLocation')); submitBtn.disabled = false; submitBtn.innerHTML = origHtml; return; }
    }
    if (!body.tags.includes('交易')){ const idx = body.tags.indexOf('低价'); if (idx >= 0) body.tags.splice(idx, 1); }
    const url = editingId ? `${API_BASE}/api/landmarks/${editingId}` : `${API_BASE}/api/landmarks`;
    const method = editingId ? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!res.ok){ const errData = await res.json().catch(() => ({})); throw new Error(errData.error || `HTTP ${res.status}`); }
    toast(editingId ? t('toastUpdated') : t('toastAdded'));
    closeAddModal(); await loadData();
  } catch (err){ console.error(err); toast(t('toastAddFail') + err.message); }
  finally { submitBtn.disabled = false; submitBtn.innerHTML = origHtml; }
});
document.getElementById('btn-add-landmark').addEventListener('click', openAddModal);
document.getElementById('add-modal-close').addEventListener('click', closeAddModal);
document.getElementById('add-modal-backdrop').addEventListener('click', closeAddModal);
document.getElementById('add-cancel').addEventListener('click', closeAddModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape' && addModal.classList.contains('open')) closeAddModal(); });
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-icon.edit'); if (!btn) return;
  e.stopPropagation(); e.preventDefault();
  const id = Number(btn.dataset.editId);
  const all = [...DATA.usable, ...DATA.unusable, ...DATA.future];
  const lm = all.find(x => x.id === id);
  if (lm) openEditModal(lm);
});
document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    if (lang === curLang) return;
    curLang = lang;
    document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b === btn));
    applyLang();
    buildAddTagPicker(); updateTagChips();
    buildBatchTagGrids(); updateBatchTagChips();
    renderAll();
  });
});

function applyMobileMode(){ const ua = navigator.userAgent || ''; const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|HarmonyOS/i.test(ua) || (('ontouchstart' in window) && window.matchMedia('(max-width: 820px)').matches); document.body.classList.toggle('is-mobile', isMobile); }
applyMobileMode();
window.addEventListener('resize', () => setTimeout(applyMobileMode, 180), { passive: true });

(function init(){
  let savedLang = null; try { savedLang = localStorage.getItem('lang'); } catch(_) {}
  if (!savedLang) savedLang = (navigator.language || '').toLowerCase().startsWith('zh') ? 'zh' : 'en';
  curLang = savedLang;
  document.querySelectorAll('.lang-switch button').forEach(b => b.classList.toggle('active', b.dataset.lang === curLang));
  let savedTheme = null; try { savedTheme = localStorage.getItem('theme'); } catch(_) {}
  if (!savedTheme) savedTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  setTheme(savedTheme);
  let savedSkin = null; try { savedSkin = localStorage.getItem('skin'); } catch(_) {}
  if (!savedSkin) savedSkin = 'github';
  setSkin(savedSkin, true);
  buildAddTagPicker();
  buildBatchTagGrids();
  applyLang();
  loadData();
})();
