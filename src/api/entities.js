import { supabase } from './supabaseClient';

function makeEntity(table) {
  return {
    async list(orderCol = 'created_at', limit = 500) {
      const ascending = !orderCol.startsWith('-');
      const col = orderCol.replace(/^-/, '');
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order(col, { ascending })
        .limit(limit);
      if (error) throw error;
      return data;
    },
    async filter(filters = {}) {
      let query = supabase.from(table).select('*');
      for (const [key, value] of Object.entries(filters)) {
        query = query.eq(key, value);
      }
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    async create(payload) {
      const { data, error } = await supabase
        .from(table).insert([payload]).select().single();
      if (error) throw error;
      return data;
    },
    async update(id, payload) {
      const { data, error } = await supabase
        .from(table).update(payload).eq('id', id).select().single();
      if (error) throw error;
      return data;
    },
    async delete(id) {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;
    },
  };
}

export const entities = {
  Booking: makeEntity('veloire_bookings'),
  Service: makeEntity('veloire_services'),
  BlockedDate: makeEntity('veloire_blocked_dates'),
};
