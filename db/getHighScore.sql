select *
from high_score
where user_id = $1
order by high_score desc
limit 1;
