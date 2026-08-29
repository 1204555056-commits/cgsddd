import { klona as t } from "https://testingcf.jsdelivr.net/npm/klona/+esm";

const z_base = z,
      e = (r, e, a) => z_base.z.coerce.number().prefault(r).transform(r => _.clamp(r, e, a)),
      hpMpSchema = z_base.z.object({
          当前: z_base.z.coerce.number().prefault(0),
          上限: z_base.z.object({ _基础: z_base.z.coerce.number().prefault(0), 额外: z_base.z.coerce.number().prefault(0) }).prefault({})
      }).prefault({}).transform(r => ({ ...r, 当前: Math.max(0, r.当前) })),
      staminaSchema = z_base.z.object({
          当前: z_base.z.coerce.number().prefault(100),
          上限: z_base.z.object({ _基础: z_base.z.coerce.number().prefault(100), 额外: z_base.z.coerce.number().prefault(0) }).prefault({})
      }).prefault({}).transform(r => ({ ...r, 当前: _.clamp(r.当前, 0, Math.max(0, r.上限._基础 + r.上限.额外)) })),
      u = z_base.z.object({ 状态: z_base.z.string().prefault(''), 关注度: z_base.z.enum(['低', '中', '高']).prefault('中'), 进展: z_base.z.string().prefault(''), 详情: z_base.z.string().prefault(''), 目标: z_base.z.string().prefault(''), 奖励: z_base.z.string().prefault('') }).prefault({}),
      f = z_base.z.object({ 品质: z_base.z.string().prefault(''), 类型: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(r => _.uniq(r)).optional(), 效果: z_base.z.record(z_base.z.string(), z_base.z.string()).prefault({}), 描述: z_base.z.string().prefault('') }),
      l = f.extend({ 位置: z_base.z.string().prefault('') }),
      p = f.extend({ 消耗: z_base.z.string().prefault(''), _隐藏: z_base.z.boolean().prefault(!1) }).transform(r => _.pick(r, ['品质', '类型', '消耗', '标签', '效果', '描述', '_隐藏'])),
      s = z_base.z.object({ 类型: z_base.z.enum(['增益', '减益', '特殊']).prefault('增益'), 效果: z_base.z.string().prefault(''), 层数: z_base.z.coerce.number().prefault(1), 剩余时间: z_base.z.string().prefault(''), 来源: z_base.z.string().prefault('') }).prefault({}),
      i = f.extend({ 数量: z_base.z.coerce.number().prefault(1), _隐藏: z_base.z.boolean().prefault(!1) }).transform(r => _.pick(r, ['品质', '类型', '数量', '标签', '效果', '描述', '_隐藏'])),
      o = z_base.z.object(_.mapValues({ 忍: 0, 体: 0, 幻: 0, 贤: 0, 力: 0, 速: 0, 精: 0, 印: 0 }, () => z_base.z.coerce.number().prefault(0))).prefault({}),
      c = z_base.z.object({ 等级: z_base.z.coerce.number().prefault(1), 实力层级: z_base.z.string().prefault(''), 身份职业: z_base.z.array(z_base.z.string()).prefault([]).transform(r => _.uniq(r)), 属性: o, 装备: z_base.z.record(z_base.z.string(), l).prefault({}), 技能: z_base.z.record(z_base.z.string(), p).prefault({}) }),
      m = z_base.z.record(z_base.z.string(), z_base.z.object({ 品质: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 数量: z_base.z.coerce.number().prefault(0), 效果: z_base.z.record(z_base.z.string(), z_base.z.string()).prefault({}), 描述: z_base.z.string().prefault(''), 总占用空间: z_base.z.string().prefault('') }).prefault({})).prefault({}),
      b = z_base.z.record(z_base.z.string(), z_base.z.object({ 品质: z_base.z.string().prefault(''), 类型: z_base.z.string().prefault(''), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 总空间: z_base.z.string().prefault(''), 结算: z_base.z.string().prefault(''), 描述: z_base.z.string().prefault(''), 位置: z_base.z.string().prefault(''), 内部资产: m, _隐藏: z_base.z.boolean().prefault(!1) }).prefault({})).prefault({}),
      d = z_base.z.object({ ...c.shape, 累计经验值: z_base.z.coerce.number().prefault(0), 升级所需经验: z_base.z.coerce.number().prefault(1000), 生命值: hpMpSchema, 查克拉: hpMpSchema, 体力值: staminaSchema, 属性点: z_base.z.coerce.number().prefault(0).transform(Math.round), 背包: z_base.z.record(z_base.z.string(), i).prefault({}).transform(r => _.pickBy(r, r => r.数量 > 0)), 资产: b, 金钱: z_base.z.coerce.number().prefault(0).transform(Math.round), 状态效果: z_base.z.record(z_base.z.string(), s).prefault({}) }).prefault({}).transform(r => _.pick(r, ['身份职业', '实力层级', '等级', '累计经验值', '升级所需经验', '属性点', '属性', '生命值', '查克拉', '体力值', '状态效果', '金钱', '背包', '资产', '装备', '技能'])),
      j = z_base.z.record(z_base.z.string(), z_base.z.object({ ...c.shape, 在场: z_base.z.boolean().prefault(!1), _隐藏: z_base.z.boolean().prefault(!1), 标签: z_base.z.array(z_base.z.string()).prefault([]).transform(_.uniq), 性格: z_base.z.string().prefault(''), 喜爱: z_base.z.string().prefault(''), 外貌: z_base.z.string().prefault(''), 着装: z_base.z.string().prefault(''), 生命值: hpMpSchema, 查克拉: hpMpSchema, 体力值: staminaSchema, 羁绊: z_base.z.boolean().prefault(!1), 好感度: e(0, -100, 100), 信任度: e(0, -100, 100), 色欲度: e(0, -100, 100), 状态效果: z_base.z.record(z_base.z.string(), s).prefault({}), 背包: z_base.z.record(z_base.z.string(), i).prefault({}).transform(r => _.pickBy(r, r => r.数量 > 0)), 资产: b, 心里话: z_base.z.string().prefault('') }).prefault({}).transform(r => _.pick(r, ['在场', '_隐藏', '标签', '身份职业', '实力层级', '等级', '生命值', '查克拉', '体力值', '属性', '状态效果', '背包', '资产', '装备', '技能', '羁绊', '好感度', '信任度', '色欲度', '心里话']))).prefault({}),
      N = z_base.z.object({ 事件: z_base.z.record(z_base.z.any(), z_base.z.any()).prefault({}), 世界: z_base.z.object({ 时间: z_base.z.string().prefault(''), 地点: z_base.z.string().prefault('') }).prefault({}), 任务列表: z_base.z.record(z_base.z.string(), u).prefault({}), 主角: d.prefault({}), 关系列表: j });

var C = ["等级提升", "NPC等级提升", "当前所在地点", "当前时间", "事件提示"],
    M = (t, e, r) => _.get(t, e, r),
    x = t => {
        const e = _.map(t, ({ id: t, content: e, position: r = "none", depth: a = 0, role: s = "system" }) => ((t, e, r) => {
            const { position: a = "none", depth: s = 0, role: n = "system" } = r ?? {};
            return { id: t, content: e, position: a, depth: s, role: n, should_scan: !0 }
        })(t, e, { position: r, depth: a, role: s }));
        injectPrompts(e)
    },
    E = t => (...e) => {
        try {
            const r = t(...e);
            return r instanceof Promise ? r.catch(e => { throw console.error(`[Script Error] ${t.name || "anonymous"}:`, e), e }) : r
        } catch (r) {
            throw console.error(`[Script Error] ${t.name || "anonymous"}:`, r), r
        }
    },
    P = { 
        5: { attributes: 1, tier: "中忍" }, 
        15: { attributes: 1, tier: "特别上忍" }, 
        25: { attributes: 2, tier: "上忍" }, 
        40: { attributes: 2, tier: "影" }, 
        60: { attributes: 3, tier: "超影" },
        80: { attributes: 3, tier: "六道级" }
    },
    j_exp = { 0: 0, 1: 120, 2: 360, 3: 720, 4: 1200, 5: 2400, 6: 3840, 7: 5520, 8: 7440, 9: 11940, 10: 16940, 11: 22440, 12: 28440, 13: 38840, 14: 50040, 15: 62040, 16: 74840, 17: 100340, 18: 127340, 19: 155840, 20: 185840, 21: 236240, 22: 289040, 23: 344240, 24: 401840, 25: 461840, 100: "MAX" },
    A = 1,
    I = 100,
    O = ["忍", "体", "幻", "贤", "力", "速", "精", "印"],
    w = t => P[t],
    V = t => {
        const e = _.chain(P).toPairs().map(([t, e]) => ({ level: Number(t), data: e })).filter(({ level: e }) => t >= e).value();
        return _.maxBy(e, "level")?.data.tier ?? "下忍"
    },
    L = t => _.get(j_exp, t, "MAX"),
    U = t => t >= I,
    D = { 1: 1, 5: 2, 9: 4, 13: 10, 17: 20, 21: 40, 25: 100 },
    S = (t, e) => {
        const r = _.chain(t).keys().map(Number).filter(t => e >= t).value(), a = _.max(r);
        return void 0 === a ? t[1] : t[a]
    },
    st = { deathCount: 0, maxCurrencyDebt: 0, bankruptcyCount: 0, illegalLevelUpId: [], totalFPGained: 0, timeRecord: {}, locationRecord: {} },
    nt = t => {
        const e = M(t, "date.log", null);
        return e || { ...st }
    },
    ot = (t, e) => {
        if (!_.has(e, "stat_data") || !_.has(t, "stat_data")) return;
        const r = nt(t);
        ((t, e, r) => {
            if (!_.has(e, "stat_data.主角.生命值.当前")) return;
            const a = M(t, "stat_data.主角.生命值.当前", 1);
            M(e, "stat_data.主角.生命值.当前", 1) > 0 && a <= 0 && r.deathCount++
        })(t, e, r),
        ((t, e) => {
            const r = M(t, "stat_data.主角.金钱", 0);
            if (r < 0) { const t = Math.abs(r); t > e.maxCurrencyDebt && (e.maxCurrencyDebt = t) }
        })(t, r),
        ((t, e, r) => {
            if (!_.has(e, "stat_data.主角.金钱")) return;
            const a = M(t, "stat_data.主角.金钱", 0);
            M(e, "stat_data.主角.金钱", 0) > 0 && a <= 0 && r.bankruptcyCount++
        })(t, e, r)
    },
    lt = (t, e) => {
        const r = M(t, "stat_data.主角", {}),
              a = _.has(e, "stat_data.主角.等级"),
              s = M(e, "stat_data.主角.等级", 1),
              n = getLastMessageId() <= 2;
        if (!n && a && s < r.等级) {
            const t = Number(M(r, "升级所需经验", 0));
            Number.isFinite(t) && Number(M(r, "累计经验值", 0)) >= t && r.等级 === s + 1 ? _.set(r, "等级", s) : (_.set(r, "等级", s), (() => {
                const t = getVariables({ type: "message" }), e = nt(t), r = getLastMessageId();
                e.illegalLevelUpId.includes(r) || e.illegalLevelUpId.push(r)
            })(), toastr.warning("等级被AI非法提升,请检查变量更新"))
        }
        if (_.set(r, "升级所需经验", L(r.等级)), r.等级 > 0) {
            const t = L(r.等级 - 1), a = Number(r.累计经验值) || 0, s = M(e, "stat_data.主角.累计经验值", a), n = Math.max(a, Number(t) || 0, s);
            r.累计经验值 !== n && _.set(r, "累计经验值", n)
        }
        _.set(r, "实力层级", V(r.等级))
    },
    it = { "下忍": 8, "中忍": 10, "特别上忍": 12, "上忍": 14, "影": 16, "超影": 18, "六道级": 20 },
    ut = t => it[t] ?? 8,
    ct = (t, e, r, a) => {
        const s = [];
        if (_.forEach(O, n => {
            const o = Number(t[n] || 0);
            if (o + Number(e[n] || 0) + Number(r[n] || 0) >= a) return;
            const l = Math.max(1, o * o);
            s.push({ key: n, weight: l })
        }), 0 === s.length) return null;
        const n = _.sumBy(s, "weight");
        let o = Math.random() * n, l = s[s.length - 1]?.key ?? O[0];
        for (const i of s) if (o -= i.weight, o <= 0) { l = i.key; break }
        return l
    },
    _t = (t, e) => Number(M(t, `属性.${e}`, 0)) || 0,
    dt = (t, e = !1) => {
        const r = Number(M(t, "等级", 1)) || 1,
              a = (t => S(D, t))(r),
              tai = _t(t, "体"),
              riki = _t(t, "力"),
              c = Math.round(100 * tai * a + (riki + tai) * 10),
              f = 100;

        _.set(t, "生命值.上限._基础", c),
        _.set(t, "查克拉.上限._基础", Math.round(r * r * 0.4 + 100)),
        _.set(t, "体力值.上限._基础", f);
        
        const g = Number(M(t, "生命值.当前", 0)) || 0,
              m = Number(M(t, "查克拉.当前", 0)) || 0,
              z = Number(M(t, "体力值.当前", 0)) || 0,
              h = Math.max(0, c + Number(M(t, "生命值.上限.额外", 0))),
              b = Math.max(0, Math.round(r * r * 0.4 + 100) + Number(M(t, "查克拉.上限.额外", 0))),
              y = _.clamp(Number(M(t, "体力值.上限.额外", 0)) ? 100 + Number(M(t, "体力值.上限.额外", 0)) : 100, 0, 100);

        _.set(t, "生命值.当前", e ? h : Math.max(0, g)),
        _.set(t, "查克拉.当前", e ? b : Math.max(0, m)),
        _.set(t, "体力值.当前", e ? y : _.clamp(z, 0, y))
    };

function ft() {
    const t = getVariables({ type: "message" }).date?.log ?? st,
          e = [`☠️ 死亡次数: ${t.deathCount}`, `💰 货币最大欠款: ${t.maxCurrencyDebt} G`, `📉 破产次数: ${t.bankruptcyCount}`, `⚠️ AI非法提升等级次数: ${t.illegalLevelUpId.length}`];
    toastr.success(e.join("\n"), "“成就”", { timeOut: 1e4 })
}

var gt = { event: { cache: "", completed_events: [] }, npcs: {}, npcLevelUpWithPlayer: !0, requiresContractForExp: !0, log: st },
    mt = (e, r) => {
        insertVariables({ date: gt }, { type: "message" });
        const a = N.safeParse(e.stat_data);
        var s;
        a.success || console.error("[火影忍者] stat_data 校验失败", a.error), e.stat_data = (s = a.success ? a.data : e.stat_data, t(s));
        const n = _.get(e, "date", gt),
              o = _.get(r, "date", gt),
              l = { stat_data: e.stat_data, date: n },
              i = { stat_data: r.stat_data, date: o };
        
        uninjectPrompts([...C]), lt(l, i), ((t, e) => {
            const r = M(t, "stat_data.主角", {}),
                  a = M(e, "stat_data.主角.等级", r.等级),
                  s = Number(r.属性点) || 0;
            let n = M(e, "stat_data.主角.实力层级", V(a));
            const o = _.fromPairs(_.map(O, t => [t, Number(M(r, `属性.${t}`, 0)) || 0]));
            let l = 0;
            const i = [], u = _.fromPairs(_.map(O, t => [t, 0]));
            for (; r.累计经验值 >= Number(r.升级所需经验) && !U(r.等级);) {
                _.set(r, "等级", r.等级 + 1), _.set(r, "升级所需经验", L(r.等级)), r.等级 % A === 0 && (l += 1);
                const e = w(r.等级);
                e && (_.forEach(O, t => { u[t] += e.attributes }), _.set(r, "实力层级", e.tier), n !== e.tier && (i.push(`{{user}}的实力层级突破到了${e.tier}`), n = e.tier))
            }
            if (_.set(r, "属性点", s + l), _.forEach(O, t => { _.set(r, `属性.${t}`, o[t] + u[t]) }), _.set(r, "实力层级", V(r.等级)), r.等级 > a) {
                const t = [`{{user}}的等级从${a}级提升到了${r.等级}级`];
                l > 0 && t.push(`{{user}}升级了，获得了${l}点属性点。引导{{user}}使用属性点`), i.length > 0 && t.push(...i), insertOrAssignVariables({ date: { levelUpCharacter: t } }, { type: "message" })
            }
        })(l, i), ((t, e) => {
            const r = M(t, "stat_data.关系列表", {});
            if (!M(t, "date.npcLevelUpWithPlayer", !0)) return;
            const s = M(t, "date.npcs", {}),
                  n = M(t, "stat_data.主角.累计经验值", 0),
                  o = n - M(e, "stat_data.主角.累计经验值", n),
                  l = getLastMessageId() <= 3;
            _.forEach(r, (t, e) => { s[e] || _.set(s, e, { level: t.等级, exp: 0, required_exp: L(t.等级) }) }),
            _.forEach(_.keys(s), t => { r[t] || _.unset(s, t) });
            const i = [];
            _.forEach(s, (s, n) => {
                const u = r[n];
                if (!u) return;
                const p = M(e, `stat_data.关系列表.${n}.等级`, void 0),
                      c = "number" != typeof p || p !== u.等级,
                      d = _.fromPairs(_.map(O, t => [t, Number(M(u, `属性.${t}`, 0)) || 0])),
                      f = _.fromPairs(_.map(O, t => [t, 0])),
                      g = _.fromPairs(_.map(O, t => [t, 0]));
                _.set(s, "level", u.等级), _.set(s, "required_exp", L(s.level));
                const m = s.level > 1 ? j_exp[s.level - 1] : 0;
                c ? "number" == typeof m && _.set(s, "exp", m) : s.level > 1 && "number" == typeof m && s.exp < m && _.set(s, "exp", m);
                const z = !l && !c, h = M(t, "stat_data.主角.等级", 1);
                z && u.在场 && o > 0 && u.等级 < h && _.set(s, "exp", s.exp + o);
                const b = u.等级;
                let y = M(e, `stat_data.关系列表.${n}.实力层级`, V(b));
                for (; z && s.exp >= s.required_exp && !U(s.level);) {
                    _.set(s, "level", s.level + 1), _.set(s, "required_exp", L(s.level));
                    const t = V(s.level), e = ut(t);
                    if (s.level % A === 0) { const t = ct(d, f, g, e); t && (f[t] += 1) }
                    const r = w(s.level);
                    r && _.forEach(O, t => { g[t] += r.attributes });
                    const a = V(s.level);
                    if (y !== a && (i.push(`${n}的实力层级突破到了${a}`), y = a), false) break;
                }
                _.forEach(O, t => { _.set(u, `属性.${t}`, d[t] + f[t] + g[t]) }),
                u.等级 < s.level && (i.unshift(`${n}从LV${b}提升到LV${s.level}`), _.set(u, "等级", s.level), _.set(u, "实力层级", V(s.level)))
            }),
            i.length > 0 ? insertOrAssignVariables({ date: { npcs: s, levelUpNpcs: i } }, { type: "message" }) : insertOrAssignVariables({ date: { npcs: s } }, { type: "message" })
        })(l, i), ((t, e = t) => {
            const r = M(t, "stat_data.主角", {});
            dt(r);
            const a = M(t, "stat_data.关系列表", {}),
                  s = M(e, "stat_data.关系列表", {});
            _.forEach(a, (t, e) => {
                const r = s[e], a = !_.has(s, e), n = M(r, "在场", void 0), o = M(t, "在场", void 0);
                dt(t, a || !0 !== n && !0 === o)
            })
        })(l, i);
        
        const u = (t => {
            uninjectPrompts(["已完成事件"]);
            const e = M(t, "stat_data.事件.开启", !1),
                  r = M(t, "stat_data.事件.结束", !1),
                  a = M(t, "stat_data.事件.标题", ""),
                  s = M(t, "stat_data.事件.阶段", ""),
                  n = M(t, "stat_data.事件.已完成事件", []);
            insertOrAssignVariables({ date: { event: { completed_events: n } } }, { type: "message" }), e && insertOrAssignVariables({ date: { event: { cache: `当前事件为${a}，当前步骤为${s}` } } }, { type: "message" });
            let o = !1;
            if (r) {
                uninjectPrompts(["事件", "事件提示"]);
                const e = [...n, `已完成事件${a}`], r = M(t, "stat_data.事件", null);
                _.isNil(r) || (_.set(r, "已完成事件", e), _.set(r, "标题", ""), _.set(r, "阶段", ""), _.set(r, "结束", !1), _.set(r, "开启", !1)), o = !0
            }
            return o
        })(l);
        ot(l, i), u && deleteVariable("date.event.cache", { type: "message" })
    },
    zt = { "stat_data.事件.信号": ["set", "add", "delete", "move", "keyed_insert", "keyed_delete"] },
    ht = t => t.replace(/^['"]|['"]$/g, ""),
    bt = t => (t => {
        if ("move" === t.type) return t.args.map(t => ({ type: "move", path: t }));
        if ("insert" === t.type && 3 === t.args.length) { const [e, r] = t.args; return [{ type: "insert", path: e }, { type: "keyed_insert", path: `${e}.${ht(r)}` }] }
        if ("delete" === t.type && 2 === t.args.length) { const [e, r] = t.args; return [{ type: "delete", path: e }, { type: "keyed_delete", path: `${e}.${ht(r)}` }] }
        return [{ type: t.type, path: t.args[0] }]
    })(t).some(({ type: t, path: e }) => zt[e]?.includes(t) ?? !1),
    yt = (t, e) => {
        const r = e.filter(t => !bt(t));
        e.splice(0, e.length, ...r)
    },
    vt = () => {
        const t = getVariables({ type: "message", message_id: -2 });
        (t => {
            const e = M(t, "stat_data.世界.地点", "未知"),
                  r = M(t, "stat_data.世界.时间", "未知");
            x([
                { id: "当前所在地点", content: e, position: "none", depth: 0, role: "system" },
                { id: "当前时间", content: r, position: "none", depth: 0, role: "system" }
            ])
        })(t), (t => {
            const e = t.date.event.completed_events, r = [];
            e.length > 0 && r.push({ id: "已完成事件", content: e.join("; "), position: "none", depth: 0, role: "system" });
            const a = t.date.event.cache;
            _.isNil(a) || _.isEmpty(a) || (r.push({ id: "事件", content: a, position: "none", depth: 0, role: "system" }), r.push({ id: "事件提示", content: "（IMPORTANT: 当前剧情事件进行中，你必须按照<event>中内容发展剧情，不得太过偏离剧情事件）", position: "in_chat", depth: 0, role: "system" })), r.length > 0 && x(r)
        })(t), (t => {
            const e = M(t, "date.levelUpCharacter", null), r = M(t, "date.levelUpNpcs", null);
            if (!e && !r) return;
            const a = [];
            e && e.length > 0 && a.push({ id: "等级提升", content: `core_system: ${e.join("; ")}`, position: "in_chat", depth: 0, role: "system" }), r && r.length > 0 && a.push({ id: "NPC等级提升", content: `core_system: ${r.join("; ")}`, position: "in_chat", depth: 0, role: "system" }), a.length > 0 && x(a), insertOrAssignVariables({ date: { levelUpCharacter: null, levelUpNpcs: null } }, { type: "message", message_id: -1 })
        })(t)
    },
    Nt = async () => {
        await waitGlobalInitialized("Mvu"), eventOn(Mvu.events.COMMAND_PARSED, E(yt)), eventOn(Mvu.events.VARIABLE_UPDATE_ENDED, E(mt)), eventOn(tavern_events.GENERATION_AFTER_COMMANDS, vt), eventOn(tavern_events.MESSAGE_SENT, vt), eventOn(tavern_events.MESSAGE_UPDATED, vt), eventOn(getButtonEvent("查看成就"), ft), console.log("[火影忍者] 脚本已加载")
    };

$(() => { E(Nt)() });
$(() => { registerMvuSchema(N); });