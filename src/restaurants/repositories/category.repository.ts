import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@EntityRepository(Category) 
export class CategoryRepository extends Repository<Category> {
  async getOrCreate(name: string): Promise<Category> {
    const categoryName = name.trim().toLowerCase();
    const categorySlug = categoryName.replace(/ /g, '-');
    let category = await this.findOne({ slug: categorySlug });
    if (!category) {
      category = await this.save(
        this.create({ slug: categorySlug, name: categoryName }),
      );
    }
    return category;
  }
}//repository를 로드할 떄 마다 this.categories.getOrCreate을 할 수 있게됨
//대신 CategoryRepository를 inject해줘야함
/*
repository를 생성할 때마다 service의 type을 바꿔줘야하고
respository를 load해줘야함 (resutaurant.module.에) => @InjectRepository쓸 필요 없어짐
*/