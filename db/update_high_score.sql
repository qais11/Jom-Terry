insert into high_score (user_id, high_score)
  values ($1, $2)
  returning *
  ;
