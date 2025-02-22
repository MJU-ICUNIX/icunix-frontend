import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  ClassStoreItem,
  ClassItem,
  WriteItem,
  CategoryItem,
  CommentItem,
} from '@/interfaces/Community_interface'
import testCategory from '@/assets/testCategory'
import testclasses from '@/assets/testclass'
import testlist from '@/assets/testlist'
import testcomments from '@/assets/testcomment'

export const useClassStore = defineStore('classStore', () => {
  const classStoreData = ref<ClassStoreItem>({
    classes: [],
    categories: [],
    writes: [],
  })

  const classes = ref<ClassItem[]>([])
  const selectedClass = ref<ClassItem>()

  const categories = ref<CategoryItem[]>([])
  const selectedCategoryId = ref<number>(1)

  const writes = ref<WriteItem[]>([])
  const comments = ref<CommentItem[]>([])

  async function fetchClasses(code: number) {
    try {
      // const res = await fetch('https://api.example.com/classes')
      // if (!res.ok) throw new Error('Failed to fetch classes')
      const newClass = testclasses //await res.json()
      //classStoreData.value.classes.push(newClass)
      classes.value = newClass
    } catch (error) {
      console.error('fetchClasses error:', error)
    }
  }

  // 특정 클래스의 카테고리 목록을 불러오기
  async function fetchCategoriesForClass(code: number, classId: number) {
    try {
      // const res = await fetch(`https://api.example.com/classes/${classId}/categories`)
      // if (!res.ok) throw new Error('Failed to fetch categories')
      const newCategory = testCategory //await res.json()
      // let categoryEntry = classStoreData.value.categories.find((item) => item.classId === classId)
      // if (!categoryEntry) {
      //   if (classId == 2) {
      //     categoryEntry = { classId, items: [] }
      //     categories.value = testCategory2
      //     console.log('categoryEntry22', categoryEntry.items)
      //     classStoreData.value.categories.push(categoryEntry)
      //   } else {
      //     categoryEntry = { classId, items: [] }
      //     categories.value = newCategory
      //     console.log('categoryEntry', categoryEntry)
      //     classStoreData.value.categories.push(categoryEntry)
      //   }

      //   //classStoreData.value.categories.push(categoryEntry)
      // }
      categories.value = newCategory //await res.json()
      //categoryEntry.items.push(newCategory)
      // categoryEntry.items = newCategory
    } catch (error) {
      console.error('fetchCategoriesForClass error:', error)
    }
  }

  // 특정 카테고리의 게시글(글)을 불러오기
  async function fetchWritesForCategory(categoryId: number) {
    try {
      // const res = await fetch(`https://api.example.com/categories/${categoryId}/writes`)
      // if (!res.ok) throw new Error('Failed to fetch writes')
      const newWrite = testlist //await res.json()
      // let writeEntry = classStoreData.value.writes.find((item) => item.categoryId === categoryId)
      // if (!writeEntry) {
      //   if (categoryId == 2 || categoryId == 1) {
      //     writeEntry = { categoryId, items: [] }
      //     // writeEntry.items = testlist2
      //     writes.value = testlist2
      //     classStoreData.value.writes.push(writeEntry)
      //   } else {
      //     writeEntry = { categoryId, items: [] }
      //     // writeEntry.items = newWrite
      //     writes.value = newWrite
      //     classStoreData.value.writes.push(writeEntry)
      //   }
      // }
      // //writeEntry.items.push(newWrite)
      // writeEntry.items = newWrite
      writes.value = newWrite //await res.json()
    } catch (error) {
      console.error('fetchWritesForCategory error:', error)
    }
  }

  async function fetchCommentsForWrite(writeId: number) {
    try {
      // const res = await fetch(`https://api.example.com/categories/${categoryId}/writes`)
      // if (!res.ok) throw new Error('Failed to fetch writes')
      const newWrite = testcomments //await res.json()
      // let writeEntry = classStoreData.value.writes.find((item) => item.categoryId === categoryId)
      // if (!writeEntry) {
      //   if (categoryId == 2 || categoryId == 1) {
      //     writeEntry = { categoryId, items: [] }
      //     // writeEntry.items = testlist2
      //     writes.value = testlist2
      //     classStoreData.value.writes.push(writeEntry)
      //   } else {
      //     writeEntry = { categoryId, items: [] }
      //     // writeEntry.items = newWrite
      //     writes.value = newWrite
      //     classStoreData.value.writes.push(writeEntry)
      //   }
      // }
      // //writeEntry.items.push(newWrite)
      // writeEntry.items = newWrite
      comments.value = newWrite //await res.json()
    } catch (error) {
      console.error('fetchWritesForCategory error:', error)
    }
  }

  async function setSelectedClass(classId: number) {
    const currentClass = classes.value.find((cls) => {
      return cls.id == classId
    })
    selectedClass.value = currentClass
    // 해당 클래스의 카테고리 목록 불러오기
    await fetchCategoriesForClass(0, classId)
    // 이전에 선택된 카테고리 및 글은 초기화
    selectedCategoryId.value = 0
    writes.value = []
  }

  // 사용자가 카테고리를 선택했을 때
  async function setSelectedCategory(categoryId: number) {
    selectedCategoryId.value = categoryId
    // 해당 카테고리의 게시글(글) 목록 불러오기
    await fetchWritesForCategory(categoryId)
  }

  return {
    classStoreData,
    classes,
    selectedClass,
    categories,
    selectedCategoryId,
    writes,
    comments,
    fetchClasses,
    fetchCategoriesForClass,
    fetchWritesForCategory,
    fetchCommentsForWrite,
    setSelectedClass,
    setSelectedCategory,
  }
})
