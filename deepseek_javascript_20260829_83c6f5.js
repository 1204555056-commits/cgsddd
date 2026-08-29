import { registerMvuSchema as r } from 'https://testingcf.jsdelivr.net/gh/StageDog/tavern_resource/dist/util/mvu_zod.js';

const z_base = z;

const e = (r, e, a) => z_base.z.coerce.number().prefault(r).transform(r => _.clamp(r, e, a));
const hpMpSchema = z_base.z.object({
  当前: z_base.z.coerce.number().prefault(0),
  上限: z_base.z.object({ _基础: z_base.z.coerce.number().prefault(0), 额外: z_base.z.coerce.number().prefault(0) }).prefault({})
}).prefault({}).transform(r => ({ ...r, 当前: Math.max(0, r.当前) }));
const staminaSchema = z_base.z.object({
  当前: z_base.z.coerce.number().prefault(100),
  上限: z_base.z.object({ _基础: z_base.z.coerce.number().prefault(100), 额外: z_base.z.coerce.number().prefault(0) }).prefault({})
}).prefault({}).transform(r => ({ ...r, 当前: _.clamp(r.当前, 0, Math.max(0, r.上限._基础 + r.上限.额外)) }));
const u = z_base.z.object({ 状态: z_base.z.string().prefault(''), 关注度: z_base.z.enum(['低', '中', '高']).prefault('中'), 进展: z_base.z.string().prefault(''), 详情: z_base.z.string().prefault(''), 目标: z_base.z.string().prefault(''), 奖励: z_base.z.string().prefault('') }).prefault({});
const f = z_base.z.object({ 品质: z_base.z.string().prefault(''), 类型: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(r => _.uniq(r)).optional(), 效果: z_base.z.record(z_base.z.string(), z_base.z.string()).prefault({}), 描述: z_base.z.string().prefault('') });
const l = f.extend({ 位置: z_base.z.string().prefault('') });
const p = f.extend({ 消耗: z_base.z.string().prefault(''), _隐藏: z_base.z.boolean().prefault(!1) }).transform(r => _.pick(r, ['品质', '类型', '消耗', '标签', '效果', '描述', '_隐藏']));
const s = z_base.z.object({ 类型: z_base.z.enum(['增益', '减益', '特殊']).prefault('增益'), 效果: z_base.z.string().prefault(''), 层数: z_base.z.coerce.number().prefault(1), 剩余时间: z_base.z.string().prefault(''), 来源: z_base.z.string().prefault('') }).prefault({});
const i = f.extend({ 数量: z_base.z.coerce.number().prefault(1), _隐藏: z_base.z.boolean().prefault(!1) }).transform(r => _.pick(r, ['品质', '类型', '数量', '标签', '效果', '描述', '_隐藏']));
const o = z_base.z.object(_.mapValues({ 忍: 0, 体: 0, 幻: 0, 贤: 0, 力: 0, 速: 0, 精: 0, 印: 0 }, () => z_base.z.coerce.number().prefault(0))).prefault({});
const c = z_base.z.object({ 等级: z_base.z.coerce.number().prefault(1), 实力层级: z_base.z.string().prefault(''), 身份职业: z_base.z.array(z_base.z.string()).prefault([]).transform(r => _.uniq(r)), 属性: o, 装备: z_base.z.record(z_base.z.string(), l).prefault({}), 技能: z_base.z.record(z_base.z.string(), p).prefault({}) });
const m = z_base.z.record(z_base.z.string(), z_base.z.object({ 品质: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 数量: z_base.z.coerce.number().prefault(0), 效果: z_base.z.record(z_base.z.string(), z_base.z.string()).prefault({}), 描述: z_base.z.string().prefault(''), 总占用空间: z_base.z.string().prefault('') }).prefault({})).prefault({});
const b = z_base.z.record(z_base.z.string(), z_base.z.object({ 品质: z_base.z.string().prefault(''), 类型: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 总空间: z_base.z.string().prefault(''), 结算: z_base.z.string().prefault(''), 描述: z_base.z.string().prefault(''), 位置: z_base.z.string().prefault(''), 内部资产: m, _隐藏: z_base.z.boolean().prefault(!1) }).prefault({})).prefault({});
const d = z_base.z.object({ ...c.shape, 累计经验值: z_base.z.coerce.number().prefault(0), 升级所需经验: z_base.z.coerce.number().prefault(1000), 生命值: hpMpSchema, 查克拉: hpMpSchema, 体力值: staminaSchema, 属性点: z_base.z.coerce.number().prefault(0).transform(Math.round), 背包: z_base.z.record(z_base.z.string(), i).prefault({}).transform(r => _.pickBy(r, r => r.数量 > 0)), 资产: b, 金钱: z_base.z.coerce.number().prefault(0).transform(Math.round), 状态效果: z_base.z.record(z_base.z.string(), s).prefault({}) }).prefault({}).transform(r => _.pick(r, ['身份职业', '实力层级', '等级', '累计经验值', '升级所需经验', '属性点', '属性', '生命值', '查克拉', '体力值', '状态效果', '金钱', '背包', '资产', '装备', '技能']));
const j = z_base.z.record(z_base.z.string(), z_base.z.object({ ...c.shape, 在场: z_base.z.boolean().prefault(!1), _隐藏: z_base.z.boolean().prefault(!1), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 性格: z_base.z.string().prefault(''), 喜爱: z_base.z.string().prefault(''), 外貌: z_base.z.string().prefault(''), 着装: z_base.z.string().prefault(''), 生命值: hpMpSchema, 查克拉: hpMpSchema, 体力值: staminaSchema, 羁绊: z_base.z.boolean().prefault(!1), 好感度: e(0, -100, 100), 信任度: e(0, -100, 100), 色欲度: e(0, -100, 100), 状态效果: z_base.z.record(z_base.z.string(), s).prefault({}), 背包: z_base.z.record(z_base.z.string(), i).prefault({}).transform(r => _.pickBy(r, r => r.数量 > 0)), 资产: b, 心里话: z_base.z.string().prefault('') }).prefault({}).transform(r => _.pick(r, ['在场', '_隐藏', '标签', '身份职业', '实力层级', '等级', '生命值', '查克拉', '体力值', '属性', '状态效果', '背包', '资产', '装备', '技能', '羁绊', '好感度', '信任度', '色欲度', '心里话'])));
const y = z_base.z.object({ 事件: z_base.z.record(z_base.z.any(), z_base.z.any()).prefault({}), 世界: z_base.z.object({ 时间: z_base.z.string().prefault(''), 地点: z_base.z.string().prefault('') }).prefault({}), 任务列表: z_base.z.record(z_base.z.string(), u).prefault({}), 主角: d.prefault({}), 关系列表: j });

$(() => { r(y); });