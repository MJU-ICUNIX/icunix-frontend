//다이얼 버튼
export interface MenuItem {
  id: number
  label: string
}

export interface DialMenuProps {
  items: MenuItem[]
  initialIndex?: number
}

//클래스 리스트
export interface ClassItem {
  id: number
  name: string
  info: string
  owner: string
}

export interface WriteItem {
  title: string
  owner: string
  writes: string
  updated_at: string
  create_at: string
  own: number
  id: number | undefined
}

export interface CategoryItem {
  id: number
  name: string
  own: number
  auth_read: number
  auth_write: number
}

export interface ClassStoreItem {
  classes: ClassItem[]
  categories: {
    classId: number
    items: CategoryItem[]
  }[]
  writes: {
    categoryId: number
    items: WriteItem[]
  }[]
}

export interface CommentItem {
  id: number
  owner: string
  own: number
  comments: string
}
