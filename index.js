const moment = require('moment/moment');

/**
 * 根据created_at字段解析时间，可能出现的情况有
 *   刚刚
 *   ss秒前
 *   mm分钟前
 *   HH小时前
 *   昨天 HH:mm
 *   MM-DD
 *   YYYY-MM-DD
 * @param { string } timeStr: 字符串
 */
function timeStringParse(timeStr) {
  /**
   * 字符串为刚刚时，返回当前时间
   */
  if (timeStr === '刚刚') {
    return moment().valueOf();
  }

  /**
   * 当字符串为秒时，计算时间差
   */
  if (/秒(前)?/.test(timeStr)) {
    const amount = Number(timeStr.match(/[0-9]+/)[0]);
    const time = moment().subtract(amount, 'seconds');

    return time.valueOf();
  }

  /**
   * 当字符串为分时，计算时间差
   */
  if (/分(钟前)?/.test(timeStr)) {
    const amount = Number(timeStr.match(/[0-9]+/)[0]);
    const time = moment().subtract(amount, 'minutes');

    return time.valueOf();
  }

  /**
   * 当字符串为分时，计算时间差
   */
  if (/小?时前?/.test(timeStr)) {
    const amount = Number(timeStr.match(/[0-9]+/)[0]);
    const time = moment().subtract(amount, 'hours');

    return time.valueOf();
  }

  /**
   * 计算昨天的时间
   */
  if (/昨天/.test(timeStr)) {
    const timeArr = timeStr.match(/[0-9]+/g);
    const time = moment();

    const HH = Number(timeArr[0]);
    const mm = Number(timeArr[1]);

    // 调整时间
    time.minutes(mm);
    time.hours(HH);
    time.subtract(1, 'days');

    return time.valueOf();
  }

  /**
   * 计算日期
   */
  if (/^[0-9]{1,2}-[0-9]{1,2}$/.test(timeStr)) {
    const timeArr = timeStr.match(/[0-9]+/g);
    const time = moment();

    const MM = Number(timeArr[0]);
    const DD = Number(timeArr[1]);

    time.date(DD);
    time.month(MM);

    return time.valueOf();
  }

  /**
   * 日期中包含年份的
   */
  if (/^[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}$/.test(timeStr)) {
    const timeArr = timeStr.match(/[0-9]+/g);
    const time = moment();

    const YYYY = Number(timeArr[0]);
    const MM = Number(timeArr[1]);
    const DD = Number(timeArr[2]);

    time.date(DD);
    time.month(MM);
    time.year(YYYY);

    return time.valueOf();
  }

  /**
   * 不返回任何数据
   */
  return undefined;
}

module.exports = timeStringParse;