// data.js - 常量与状态
const API_BASE = 'https://api.sunwe.dpdns.org';
const BUILDER_NATURAL = '自然生成', BUILDER_MULTI = '多人', BUILDER_UNKNOWN = '未知';

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
const TAG_DESC = { zh:{生电:'红石/自动化机器',交易:'村民交易点',农场:'农牧渔场',遗留:'旧地点',低价:'低价附魔',已毁:'已损坏'}, en:{生电:'Redstone/automation',交易:'Villager trade',农场:'Farming',遗留:'Legacy',低价:'Cheap',已毁:'Ruined'} };

const DATA = { usable: [], unusable: [], future: [] };
const $ = s => document.querySelector(s);

// 全局状态变量
let selectedIds = new Set();
let selectMode = false;
let currentQuery = '';
let allOpen = false;
let editingId = null;
let editingLM = null; // 编辑中的原始数据（用于保留 note_en / rate_en / products_en 等英文字段）
let selectedTags = [];
let coordMode = 'single';
let batchAddTags = new Set();
let batchRemoveTags = new Set();
let currentCopyCommands = { op: '', tp: '' };
let curDim = 'all', curCat = 'all';
let importFormat = 'csv', importParsed = [], importRunning = false, importDebounce = null;
let importMergeInfo = { merged: 0, ignored: 0 };
