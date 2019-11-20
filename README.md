# chatspace DB設計
## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique:true|
|mail|string|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :messages
- has_many :groups_users
## commentsテーブル
|Column|Type|Options|
|------|----|-------|
|image|text||
|text|text||
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user
## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique:true|
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :comments