class ProspectMailer < ActionMailer::Base

  def notification(visitor, subject)
    @visitor = visitor
    mail(to: @visitor.email, subject: subject)
  end
end