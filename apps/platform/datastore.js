const DATA = {
  subscriptionPlans: [],
  activityFrequencies: [],
  activityTypes: [],
  ageGroups: [],
  grades: [],
  personas: [],
  categories: [],
  utils: [],
};

export const SubscriptionPlans = {
  /**
   * @param {{
    *   id: string;
    *   meta: object;
    *   price: number;
    *   subscriptionCycleId: string;
    *   subscriptionCycle: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     billingPeriod: number,
    *     meta: {},
    *   }
    *   subscriptionTierId: string;
    *   subscriptionTier: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     meta: {
    *       description: array,
    *       merits: array,
    *     },
    *   }
    * }[]} data
    */
  set setData(data) {
    DATA.subscriptionPlans = data;
  },

  /**
   * @return {{
   *   id: string;
   *   meta: object;
   *   price: number;
   *   subscriptionCycleId: string;
   *   subscriptionCycle: {
   *     id: string,
   *     name: string,
   *     alias: string,
   *     billingPeriod: number,
   *     meta: {},
   *   }
   *   subscriptionTierId: string;
   *   subscriptionTier: {
   *     id: string,
   *     name: string,
   *     alias: string,
   *     meta: {
   *       description: array,
   *       merits: array,
   *     },
   *   }
   * }[]} data
   */
  get data() {
    return DATA.subscriptionPlans;
  },

  /**
   * @return {{
    *   id: string;
    *   meta: object;
    *   price: number;
    *   subscriptionCycleId: string;
    *   subscriptionCycle: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     billingPeriod: number,
    *     meta: {},
    *   }
    *   subscriptionTierId: string;
    *   subscriptionTier: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     meta: {
    *       description: array,
    *       merits: array,
    *     },
    *   }
    * }} data
    */
  find: (id) => {
    for (const subscription of DATA.subscriptionPlans) {
      if (subscription.id === id) {
        return subscription;
      }
    }
    return false;
  },

  /**
   * @return {{
    *   id: string;
    *   meta: object;
    *   price: number;
    *   subscriptionCycleId: string;
    *   subscriptionCycle: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     billingPeriod: number,
    *     meta: {},
    *   }
    *   subscriptionTierId: string;
    *   subscriptionTier: {
    *     id: string,
    *     name: string,
    *     alias: string,
    *     meta: {
    *       description: array,
    *       merits: array,
    *     },
    *   }
    * }[]} data
    */
  findByCycleAlias: (cycleName) => DATA.subscriptionPlans.filter((subscription) => subscription.subscriptionCycle.alias === cycleName),
};

export const ActivityFrequencies = {
  /**
   * @param {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   interval: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.activityFrequencies = data;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   interval: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  get data() {
    return DATA.activityFrequencies;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   interval: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }} Activity Frequency
   */
  find: (id) => {
    for (const activityFrequency of DATA.activityFrequencies) {
      if (activityFrequency.id === id) {
        return activityFrequency;
      }
    }
    return false;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   interval: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }} Activity Frequency
   */
  findByTitle: (title) => {
    for (const frequency of DATA.activityFrequencies) {
      if (frequency.title === title) {
        return frequency;
      }
    }
    return false;
  },
};

export const ActivityTypes = {
  /**
   * @param {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   requireLocation: boolean;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.activityTypes = data;
  },
  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   requireLocation: boolean;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  get data() {
    return DATA.activityTypes;
  },
  /**
   * @return {{
    *   id: string;
    *   title: string;
    *   description: string;
    *   requireLocation: boolean;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} data
    */
  find: (id) => {
    for (const type of DATA.activityTypes) {
      if (type.id === id) {
        return type;
      }
    }
    return false;
  },
  /**
   * @return {{
    *   id: string;
    *   title: string;
    *   description: string;
    *   requireLocation: boolean;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} data
    */
  findByTitle: (title) => {
    for (const type of DATA.activityTypes) {
      if (type.title === title) {
        return type;
      }
    }
    return false;
  },
};

export const AgeGroups = {
  /**
   * @param {{
   *   id: string;
   *   title: string;
   *   value: string;
   *   description: string;
   *   start: number;
   *   end: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.ageGroups = data;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   value: string;
   *   description: string;
   *   start: number;
   *   end: number;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} Age Groups
   */
  get data() {
    return DATA.ageGroups;
  },
  /**
   * @return {{
    *   id: string;
    *   title: string;
    *   value: string;
    *   description: string;
    *   start: number;
    *   end: number;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Age Group
    */
  find: (id) => {
    for (const ageGroup of DATA.ageGroups) {
      if (ageGroup.id === id) {
        return ageGroup;
      }
    }
    return false;
  },
  /**
  * @return {string} Age
  */
  get maxAge() {
    let maxAge = 0;
    DATA.ageGroups.forEach((aG) => {
      if (aG.end > maxAge) {
        maxAge = aG.end;
      }
    });
    return maxAge;
  },
  /**
  * @return {string[]} Age Groups id
  */
  get allId() {
    const ids = DATA.ageGroups.map((aG) => aG.id);
    return ids;
  },
  /**
   * @return {{
    *   id: string;``
    *   title: string;
    *   value: string;
    *   description: string;
    *   start: number;
    *   end: number;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Age Group
    */
  getGroup: (age) => {
    for (const ageGroup of DATA.ageGroups) {
      if (age >= ageGroup.start && age <= ageGroup.end) {
        return ageGroup;
      }
    }
    return false;
  },
};

export const Grades = {
  /**
   * @param {{
   *   id: string;
   *   title: string;
   *   value: string;
   *   description: string;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.grades = data;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   value: string;
   *   description: string;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} Age Groups
   */
  get data() {
    return DATA.grades;
  },
  /**
   * @return {{
    *   id: string;
    *   title: string;
    *   value: string;
    *   description: string;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Age Group
    */
  find: (id) => {
    for (const grade of DATA.grades) {
      if (grade.id === id) {
        return grade;
      }
    }
    return false;
  },

  /**
  * @return {string[]} Age Groups id
  */
  get allId() {
    const ids = DATA.grades.map((aG) => aG.id);
    return ids;
  },

};
/// ////////////////////////////////////////////////////

export const Personas = {
  /**
   * @param {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   options: array
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.personas = data;
  },

  /**
   * @return {{
   *   id: string;
   *   title: string;
   *   description: string;
   *   options: array
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} Personas
   */
  get data() {
    return DATA.personas;
  },
  /**
   * @return {{
    *   id: string;
    *   title: string;
    *   description: string;
    *   options: array
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Persona
    */
  find: (id) => {
    for (const grade of DATA.personas) {
      if (grade.id === id) {
        return grade;
      }
    }
    return false;
  },

  /**
  * @return {string[]} Personas id
  */
  get allId() {
    const ids = DATA.personas.map((aG) => aG.id);
    return ids;
  },

};
/// ////////////////////////////////////////////////////
export const Categories = {
  /**
  * @param {{
  *   id: string;
  *   title: string;
  *   value: string;
  *   description: string;
  *   updatedAt: Date;
  *   createdAt: Date;
  * }[]} data
  */
  set setData(data) {
    DATA.categories = data;
  },

  /**
  * @return {{
  *   id: string;
  *   title: string;
  *   value: string;
  *   description: string;
  *   updatedAt: Date;
  *   createdAt: Date;
  * }[]} Categories
  */
  get data() {
    return DATA.categories;
  },

  /**
  * @return {string[]} Catgories Title
  */
  get titles() {
    const titles = DATA.categories.map((col) => col.title);
    return titles;
  },
  /**
  * @return {string[]} Catgories Value
  */
  get values() {
    const values = DATA.categories.map((col) => col.value);
    return values;
  },
  /**
  * @return {string[]} Catgories Title
  */
  get allId() {
    const ids = DATA.categories.map((col) => col.id);
    return ids;
  },
  /**
  * @return {{
    *   id: string;
    *   title: string;
    *   value: string;
    *   description: string;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Categories
    */
  find: (id) => {
    for (const category of DATA.categories) {
      if (category.id === id) {
        return category;
      }
    }
    return false;
  },
  /**
  * @return {{
    *   id: string;
    *   title: string;
    *   value: string;
    *   description: string;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }} Categories
    */
  findByValue: (value) => {
    for (const category of DATA.categories) {
      if (category.value === value) {
        return category;
      }
    }
    return false;
  },
  /**
  * @return {{
    *   id: string;
    *   title: string;
    *   value: string;
    *   description: string;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }[]} Categories Title
    */
  getTitles: (ids) => {
    if (Array.isArray(ids)) {
      const titles = [];
      ids.forEach((id) => {
        const category = Categories.find(id);
        if (category) {
          titles.push(category.title);
        }
      });

      return titles;
    }

    const category = Categories.find(ids);
    if (category) {
      return [category.title];
    }
    return false;
  },
};

export const Utils = {
  /**
   * @param {{
   *   id: string;
   *   key: string;
   *   value: string;
   *   type: string;
   *   description: string;
   *   updatedAt: Date;
   *   createdAt: Date;
   * }[]} data
   */
  set setData(data) {
    DATA.utils = data.map((info) => {
      let value = info.type;

      if (info.type === 'ARRAY') {
        value = info.value.split(',');
      } else if (info.type === 'JSON') {
        value = JSON.parse(info.value);
        console.log('FOUND JSON', { value });
      } else if (info.type === 'NUMBER') {
        value = Number(info.value);
      }

      return {
        ...info,
        value,
      };
    });
  },

  /**
   * @return {{
    *   id: string;
    *   key: string;
    *   value: string;
    *   type: string;
    *   description: string;
    *   updatedAt: Date;
    *   createdAt: Date;
    * }[]} data
   */
  get data() {
    return DATA.utils;
  },

  /**
   * @param {string} key
   * @return {string|number|array|object} value
   */
  getValue: (key) => {
    let value = null;
    for (const info of DATA.utils) {
      if (info.key === key) {
        value = info.value;
        break;
      }
    }

    return value;
  },
};
