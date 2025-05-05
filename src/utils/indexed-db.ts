import Dexie from "dexie";

const version = 12;

/**
 * 컬럼 구조
 */
interface ColumnSetting {
  id: string;
  hidden: boolean;
  order: number;
  width: number;
}

/**
 * 그리드 컬럼 설정
 */
export interface GridColumns {
  userId: string;
  custId: string;
  menuId: string;
  gridId: string;
  columns: ColumnSetting[];
}

interface ConditionSetting {
  hidden: boolean;
}

/**
 * 검색 조건 설정
 */
export interface SearchCondition {
  userId: string;
  custId: string;
  menuId : string;
  componentId: string;
  context: ConditionSetting[];
}

/**
 * 메뉴 별 커스텀 설정
 */
export interface CustomSetting {
  userId: string;
  custId: string;
  menuId : string;
  settingsJson: string;
}

class MyDB extends Dexie {
  gridColumns: Dexie.Table<GridColumns, [string, string, string]>;
  searchConditions: Dexie.Table<SearchCondition, [string, string, string]>;
  customSettings: Dexie.Table<CustomSetting, string>;

  constructor() {
    super("MyDB");

    this.version(version).stores({
      gridColumns: "[userId+custId+menuId]",
      searchConditions: "[userId+custId+menuId]",
      customSettings: "[userId+custId+menuId]",
    }).upgrade((tx) => {
      alert("DB Upgrade");
    });

    this.gridColumns = this.table("gridColumns");
    this.searchConditions = this.table("searchConditions");
    this.customSettings = this.table("customSettings");
  }
}

export const UserSettingsDB = new MyDB();