// src/pages/controller.ts
import { JsonController, Get, Put, Body, Param, Post, HttpCode, NotFoundError } from 'routing-controllers'
import Page from './entity'


//type PageList = Page[]
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
  @Get("/pages")
  allPages(): void {
    //return Page
  }

  @Put('/pages/:id')
  async updatePage(
    @Param('id') id: number,
    @Body() update: Partial<Page>
  ) {
    const page = await Page.findOne(id)
    if (!page) throw new NotFoundError('Cannot find page')

    return Page.merge(page, update).save()
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() page: Page
  ) {
    return page.save()
  }

  // this markes a method as endpoint
  // in this case it responds to any GET /pages/:id
  // request with :id being a variable parameter
  @Get('/pages/:id')
  getPage(
    @Param('id') id: number
  ) {
    return Page.findOne(id)
  }
}
