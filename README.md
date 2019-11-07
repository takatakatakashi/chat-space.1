## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, unique: true|
### Association
- belongs_to :user
- belongs_to :group.user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false, unique: true|
|name|string|null: false, add_index: true|
### Association
- belongs_to :group
- belongs_to :group.user

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user